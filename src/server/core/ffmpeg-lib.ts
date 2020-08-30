// TODO: add tests

import {ConfigService} from '../config/config'
import * as path from 'path'
import {IMediaFileInfo, IStreamInfo} from '../shared/classes/medial-file-info'
import {v4 as uuid4} from 'uuid';
import {ExecLib} from './exec-lib'
import {catchError, switchMap} from 'rxjs/operators'
import {Observable, of} from 'rxjs'

export class FConst {
    static ffmpeg = '#ffmpeg#'
    static ffprobe = '#ffprobe#'
    static mediaFile = '#mediaFile#'
    static maps = '#maps#'
    static mapID = '#mapID#'
    static streamName = '#streamName#'
}

export class FFmpegCommands {

    static config = ConfigService.loadConfig()
    static mediaInfo = `"${FConst.ffprobe}" -v error -show_format -show_streams "${FConst.mediaFile}"`
    static extractStream = `${FConst.ffmpeg} -y -i ${FConst.mediaFile} ${FConst.maps}  >> out.txt 2>&1`
    static extractStreamMap = `-map ${FConst.mapID} -c copy ${FConst.streamName}`

    static getMediaFullPath(mfi: IMediaFileInfo) {
        return path.resolve(mfi.mediaPath, mfi.fileName)
    }

    static getMediaExtractTempFolderFullPath(fileName: string) {
        return path.resolve(this.config.tempPath, this.removeFileExt(fileName))
    }

    static removeFileExt(fileName: string) {
        return fileName.split('.').slice(0, -1).join('.')
    }

    static getStreamUniqueName(mfi: IMediaFileInfo, si: IStreamInfo) {
        return path.resolve(`${FFmpegCommands.removeFileExt(mfi.fileName)}_${si.map_id}_${si.codec_type}.${si.codec_name}`)
    }

    static ffprobeCodecInfo(mfi: IMediaFileInfo) {
        const execString = FFmpegCommands.mediaInfo
            .replace(FConst.ffprobe, this.config.ffprobeFilePath)
            .replace(FConst.mediaFile, FFmpegCommands.getMediaFullPath(mfi))
        console.log(execString)
        return execString
    }

    static ffmpegExtractAllStreams(mfi: IMediaFileInfo) {
        let mapString = [];
        mfi.streamInfo.forEach(si => {
            mapString.push(FFmpegCommands.extractStreamMap
                .replace(FConst.mapID, `0:${si.map_id}`)
                .replace(FConst.streamName, FFmpegCommands.getStreamUniqueName(mfi, si))
            )
        })
        const execString = FFmpegCommands.extractStream
            .replace(FConst.ffmpeg, this.config.ffmpegFilePath)
            .replace(FConst.mediaFile, FFmpegCommands.getMediaFullPath(mfi))
            .replace(FConst.maps, mapString.join(' '))
        console.log(execString)
        return execString
    }

}

export class FFmpegLib {

    static config = ConfigService.loadConfig()

    static getMediaInfo(mfi: IMediaFileInfo): Observable<IMediaFileInfo> {
        return ExecLib.exec(FFmpegCommands.ffprobeCodecInfo(mfi), {cwd: mfi.mediaPath})
            .pipe(
                switchMap((result: Array<string>) => {
                    mfi.streamInfo = FFmpegParserLib.ffprobeCodecInfoParse(result[0])
                    return of<IMediaFileInfo>(mfi)
                }),
                catchError(error => {
                    mfi.errorMessage = error.message
                    return of<IMediaFileInfo>(mfi)
                })
            )
    }

    public static extractStreams(mfi: IMediaFileInfo) {
        return ExecLib.exec(FFmpegCommands.ffmpegExtractAllStreams(mfi), {cwd: path.resolve(mfi.mediaPath)})
            .pipe(
                switchMap(() => of<IMediaFileInfo>(mfi)),
                catchError(error => {
                    mfi.errorMessage = error.message
                    return of<IMediaFileInfo>(mfi)
                })
            )
    }

}

export class FFmpegParserLib {

    static ffprobeCodecInfoParse(ffprobeOut: string) {
        let streamInfo: Array<IStreamInfo> = []
        const lines = ffprobeOut.split('\r\n')
        let map_id = 0;
        if (lines[0] !== '[STREAM]') {
            return streamInfo
        } else {
            streamInfo.push(<IStreamInfo>{id: uuid4(), map_id: map_id})
        }
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].indexOf('[/STREAM]') >= 0) {
                map_id++
            }
            const param = this.getCodecParam(lines[i])
            if (param) {
                if (!streamInfo[map_id]) {
                    streamInfo.push(<IStreamInfo>{id: uuid4(), map_id: map_id})
                }
                streamInfo[map_id][param[0]] = param[1]
            }
        }
        return streamInfo
    }

    private static getCodecParam(line: string) {
        const index = line.indexOf('=')
        const param = ['', '']
        if (index >= 0) {
            param[0] = line.substr(0, index)
            switch (param[0]) {
                case 'codec_name':
                case 'codec_type':
                    param[1] = line.substr(index + 1)
                    return param
            }
        }
        return
    }

}
