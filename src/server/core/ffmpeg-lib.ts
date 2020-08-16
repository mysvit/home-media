// TODO: add tests

import {StreamInfo} from '../shared/classes/medial-file-info'

export class FFmpegLib {

    static getInfo(param) {
        return `"${param.config.ffprobeFilePath}" -i "${param.fileName}"`
    }

}

export class FFmpegParserLib {

    static getStreamInfo(ffprobeOut: Array<any>) {
        let streamInfo: Array<StreamInfo> = []
        let m
        const regex = /^\s*Stream.*$/gm;
        while ((m = regex.exec(ffprobeOut[1])) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++
            }
            m.forEach((match, index) => {
                streamInfo.push(<StreamInfo>{id: index, title: match})
            })
        }
        return streamInfo
    }

}
