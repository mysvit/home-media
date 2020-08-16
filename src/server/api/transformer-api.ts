import * as express from 'express';
import {ConfigService} from "../config/config";
import {FileLib} from "../core/file-lib";
import {MedialFileInfo} from "../shared/classes/medial-file-info";
import {ExecLib} from '../core/exec-lib'
import {FFmpegLib, FFmpegParserLib} from '../core/ffmpeg-lib'
import * as path from 'path'

export class TransformerApi {

    public router = express.Router();
    public path = '/transformer';

    constructor() {
        this.router.get(this.path + '/get-media-files', Transformer.getMediaFiles);
        this.router.post(this.path + '/get-media-file-info', Transformer.getMedialFileInfo);
    }

}

class Transformer {

    public static getMediaFiles(request: express.Request, response: express.Response) {
        const config = ConfigService.DefaultWindowsConfig()
        FileLib.readDir(config.mediaPath)
            .subscribe(fileNames => {
                response.status(200).send(fileNames)
            })
    }

    public static getMedialFileInfo(request: express.Request, response: express.Response) {
        const config = ConfigService.DefaultWindowsConfig()
        const mif = <MedialFileInfo>request.body
        if (Transformer.checkFileName(config.mediaPath, mif.fileName)) {
            const mediaFileName = path.resolve(config.mediaPath, mif.fileName)
            ExecLib.exec(FFmpegLib.getInfo({config: config, fileName: mediaFileName}))
                .subscribe(stdOut => {
                    mif.streamInfo = FFmpegParserLib.getStreamInfo(stdOut)
                    response.status(200).send(mif)
                })
        }
    }

    private static checkFileName(mediaPath, fileName) {
        // TODO: check if file exist in media folder
        return !!mediaPath && !!fileName
    }

}
