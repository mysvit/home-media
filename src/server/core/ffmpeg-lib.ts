// TODO: add tests

import {MedialFileInfo, StreamInfo} from '../shared/classes/medial-file-info'
import {AppConfig} from '../config/config'
import * as path from 'path'

export class FFmpegLib {

    static ffprobeCodecInfo(param: { fileName: string; config: AppConfig }) {
        const ffprobe_parameters = '-v error -show_format -show_streams';
        return `"${param.config.ffprobeFilePath}" ${ffprobe_parameters} "${param.fileName}"`
    }

    static getStreams(param: { mif: MedialFileInfo; config: AppConfig }) {
        const mediaFileName = path.resolve(param.config.mediaPath, param.mif.fileName)
        let execString = `"${param.config.ffprobeFilePath}" -i "${mediaFileName}"`;
        param.mif.streamInfo.forEach(s => {
            if (s.isExtract) {
                execString += ` -map 0:${s.id} -c copy ${s.id}_${s.codec_type}.${s.codec_name}`
            }
        })
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

    static ffprobeCodecInfoParse(ffprobeOut: Array<any>) {
        let streamInfo: Array<StreamInfo> = []
        const lines = ffprobeOut[0].split('\r\n')
        let id = 0;
        if (lines[0] !== '[STREAM]') {
            return streamInfo
        } else {
            streamInfo.push(<StreamInfo>{id: id})
        }
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].indexOf('[/STREAM]') >= 0) {
                id++
            }
            const param = this.getCodecParam(lines[i])
            if (param) {
                if (!streamInfo[id]) {
                    streamInfo.push(<StreamInfo>{id: id})
                }
                streamInfo[id][param[0]] = param[1]
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
