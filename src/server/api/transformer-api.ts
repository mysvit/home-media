import * as express from 'express';
import {ConfigService} from "../config/config";
import {FileLib} from "../core/file-lib";
import {IMediaFileInfo} from "../shared/classes/medial-file-info";
import {FFmpegLib} from '../core/ffmpeg-lib'
import * as path from 'path'
import {IMediaSelector} from '../shared/classes/media-selector'

export class TransformerApi {

    public router = express.Router();
    public path = '/transformer';

    constructor() {
        this.router.post(this.path + '/get-files', Transformer.getFiles);
        this.router.post(this.path + '/get-media-file-info', Transformer.getMedialFileInfo);
    }

}

class Transformer {

    public static getFiles(request: express.Request, response: express.Response) {
        const mi = <IMediaSelector>request.body
        FileLib.readDir(mi.mediaPath)
            .subscribe((fileNames: Array<string>) => {
                    mi.mediaFiles = <Array<IMediaFileInfo>>
                        fileNames.map(fileName => <IMediaFileInfo>{
                                mediaPath: mi.mediaPath, fileName: fileName, fileExt: path.extname(fileName)
                            }
                        )
                    response.status(200).send(mi)
                },
                error => {
                    mi.errorMessage = error.message
                    response.status(200).send(mi)
                })
    }

    public static getMedialFileInfo(request: express.Request, response: express.Response) {
        const config = ConfigService.DefaultWindowsConfig()
        const mfi = <IMediaFileInfo>request.body
        FFmpegLib.getMediaInfo(mfi).subscribe(mfiResult => response.status(200).send(mfiResult))
    }

    private static checkFileName(fileName) {
        // TODO: check if file exist in media folder
        return !!fileName
    }

}
