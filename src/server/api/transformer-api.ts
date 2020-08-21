import * as express from 'express';
import {ConfigService} from "../config/config";
import {FileLib} from "../core/file-lib";
import {IMedialFileInfo, IMedialInfo} from "../shared/classes/medial-file-info";
import {ExecLib} from '../core/exec-lib'
import {FFmpegLib, FFmpegParserLib} from '../core/ffmpeg-lib'
import * as path from 'path'
import {exec} from 'child_process'

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
        const mi = <IMedialInfo>request.body
        FileLib.readDir(mi.mediaPath)
            .subscribe((fileNames: Array<string>) => {
                mi.medialFileInfo = <Array<IMedialFileInfo>>fileNames
                    .map(fn => <IMedialFileInfo>{mediaPath: mi.mediaPath, fileName: fn})
                response.status(200).send(mi)
            })
    }

    public static getMedialFileInfo(request: express.Request, response: express.Response) {
        const config = ConfigService.DefaultWindowsConfig()
        const mfi = <IMedialFileInfo>request.body
        if (Transformer.checkFileName(mfi.fileName)) {
            exec(FFmpegLib.ffprobeCodecInfo({mfi: mfi, config: config}), {cwd: mfi.mediaPath},
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

    public static getMediaFileStreams(request: express.Request, response: express.Response) {
        const config = ConfigService.DefaultWindowsConfig()
        const mif = <IMedialFileInfo>request.body
        if (Transformer.checkFileName(mif.fileName)) {
            ExecLib.exec(FFmpegLib.getStreams({config: config, mfi: mif}))
                .subscribe(
                    stdOut => {
                        response.status(200).send(stdOut)
                    },
                    error => {
                        response.status(200).send(error)
                    })

            // const child = spawn(config.ffmpegFilePath, [FFmpegLib.getStreams({config: config, mif: mif})])
            // const child = spawn('cmd', ['/?'])
            // let i = 0
            // response.setHeader('Content-Type', 'text/html');
            // for await (const data of child.stdout) {
            //     i++
            //     console.log(`stdout from the child: ${data}`);
            //     const ss = i.toString(2)
            //     console.log('await', ss);
            //     response.write(data)
            // }
            // response.end();
            // console.log('end')
        }
    }

    private static checkFileName(fileName) {
        // TODO: check if file exist in media folder
        return !!fileName
    }

}

function exe(arg) {

}

