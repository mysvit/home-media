// TODO: add tests

import {AppConfig} from '../config/config'
import * as path from 'path'
import {IMediaFileInfo, IStreamInfo} from '../shared/classes/medial-file-info'
import {v4 as uuid4} from 'uuid';

export class FFmpegLib {

    static ffprobeCodecInfo(param: { mfi: IMediaFileInfo; config: AppConfig }) {
        const ffprobe_parameters = '-v error -show_format -show_streams';
        const execString = `"${param.config.ffprobeFilePath}" ${ffprobe_parameters} "${param.mfi.fileName}"`
        console.log(execString)
        return execString
    }

    static getStreams(param: { mfi: IMediaFileInfo; config: AppConfig }) {
        // const mediaFileName = path.resolve(param.config.mediaPath, param.mif.fileName)
        let execString = `"${param.config.ffmpegFilePath}" -y -i "${param.mfi.fileName}" `
        // param.mfi.streamInfo.forEach(s => {
        //     if (s.isExtract) {
        //         const streamName = path.resolve(`${s.id}_${s.codec_type}.${s.codec_name}`)
        //         execString += ` -map 0:${s.id} -c copy ${streamName}`
        //     }
        // })
        console.log(execString)
        const outFile = path.resolve('out.txt')
        execString += ` > "${outFile}" 2>&1`
        return execString
    }

}

export class FFmpegParserLib {

    // static getStreamInfo(ffprobeOut: Array<any>) {
    //     const regex = /^\s*Stream.*$/gm;
    //     let streamInfo: Array<StreamInfo> = []
    //     let m
    //     let i = 0
    //     while ((m = regex.exec(ffprobeOut[1])) !== null) {
    //         // This is necessary to avoid infinite loops with zero-width matches
    //         if (m.index === regex.lastIndex) {
    //             regex.lastIndex++
    //         }
    //         m.forEach(match => {
    //             streamInfo.push(<StreamInfo>{id: i, title: match})
    //             i++
    //         })
    //     }
    //     return streamInfo
    // }

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
