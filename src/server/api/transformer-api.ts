import * as express from 'express';
import {ConfigService} from "../config/config";
import {FileLib} from "../core/file-lib";
import {IMediaFileInfo} from "../shared/classes/medial-file-info";
import {ExecLib} from '../core/exec-lib'
import {FFmpegLib, FFmpegParserLib} from '../core/ffmpeg-lib'
import {exec} from 'child_process'
import * as path from 'path'
import {IMediaSelector} from '../shared/classes/media-selector'

export class TransformerApi {

    public router = express.Router();
    public path = '/transformer';

    constructor() {
        this.router.post(this.path + '/get-media-info', Transformer.getMediaInfo);
        this.router.post(this.path + '/get-media-file-info', Transformer.getMedialFileInfo);
        this.router.post(this.path + '/get-media-file-streams', Transformer.getMediaFileStreams);
    }

}

class Transformer {

    public static getMediaInfo(request: express.Request, response: express.Response) {
        const mi = <IMediaSelector>request.body
        FileLib.readDir(mi.mediaPath)
            .subscribe((fileNames: Array<string>) => {
                mi.mediaFiles = <Array<IMediaFileInfo>>
                    fileNames.map(fileName => <IMediaFileInfo>{
                            mediaPath: mi.mediaPath, fileName: fileName, fileExt: path.extname(fileName)
                        }
                    )
                response.status(200).send(mi)
            })
    }

    public static getMedialFileInfo(request: express.Request, response: express.Response) {
        const config = ConfigService.DefaultWindowsConfig()
        const mfi = <IMediaFileInfo>request.body
        if (Transformer.checkFileName(mfi.fileName)) {
            ExecLib.exec(FFmpegLib.ffprobeCodecInfo({mfi: mfi, config: config}), {cwd: mfi.mediaPath})
                .subscribe(
                    (result: Array<string>) => {
                        mfi.streamInfo = FFmpegParserLib.ffprobeCodecInfoParse(result[0])
                        response.status(200).send(mfi)
                    },
                    error => {
                        mfi.errorMessage = error.message
                        response.status(200).send(mfi)
                    })
        }
    }

    public static getMediaFileStreams(request: express.Request, response: express.Response) {
        const config = ConfigService.DefaultWindowsConfig()
        const mfi = <IMediaFileInfo>request.body
        if (Transformer.checkFileName(mfi.fileName)) {
            exec(FFmpegLib.getStreams({config: config, mfi: mfi}), {cwd: mfi.mediaPath},
                (error, stdout, stderr) => {
                    if (error) {
                        mfi.errorMessage = stderr
                        response.status(200).send(mfi)
                    } else {
                        mfi.streamInfo = FFmpegParserLib.ffprobeCodecInfoParse(stdout)
                        response.status(200).send(mfi)
                    }
                })
        }
    }

    public static startConversion(request: express.Request, response: express.Response) {
        // create temp folder if not exist
        // check if  [process] file exist and process not running
        // copy original file to temp folder
        // extract streams
        // convert streams to new types
        // create new media file
        // copy file to original location

    }

    private static checkFileName(fileName) {
        // TODO: check if file exist in media folder
        return !!fileName
    }

}
