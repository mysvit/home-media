import {IStreamTransformer} from '../shared/classes/media-transformer'
import {ConfigService} from '../config/config'
import {FileLib} from '../core/file-lib'
import {FFmpegCommands} from '../core/ffmpeg-lib'
import {forkJoin} from 'rxjs'
import {map} from 'rxjs/operators'

export class TransformerProcess {

    static config = ConfigService.loadConfig()

    public static startTransformation(data) {
        const streams = <Array<IStreamTransformer>>JSON.parse(data)
        return this.createMediaFolderInTemp(streams)
            .pipe(
                map(result => console.log(result))
            )
        // FileLib.mkDir(FFmpegCommands.getMediaExtractTempFolderFullPath())
        // create temp folder if not exist
        // check if  [process] file exist and process not running
        // copy original file to temp folder
        // extract streams
        // convert streams to new types
        // create new media file
        // copy file to original location
    }

    static createMediaFolderInTemp(streams: Array<IStreamTransformer>) {
        const listOfMediaDir: Array<string> = []
        streams.forEach(stream => {
            if (listOfMediaDir.findIndex(f => f === stream.fileName) < 0) {
                listOfMediaDir.push(FFmpegCommands.getMediaExtractTempFolderFullPath(stream.fileName))
            }
        })
        return forkJoin(listOfMediaDir.map(dirName => FileLib.mkDir(dirName)))
    }


    // public static getMediaFileStreams(request: express.Request, response: express.Response) {
    //     const config = ConfigService.DefaultWindowsConfig()
    //     const mfi = <IMediaFileInfo>request.body
    //     if (Transformer.checkFileName(mfi.fileName)) {
    //         exec(FFmpegLib.getStreams({config: config, mfi: mfi}), {cwd: mfi.mediaPath},
    //             (error, stdout, stderr) => {
    //                 if (error) {
    //                     mfi.errorMessage = stderr
    //                     response.status(200).send(mfi)
    //                 } else {
    //                     mfi.streamInfo = FFmpegParserLib.ffprobeCodecInfoParse(stdout)
    //                     response.status(200).send(mfi)
    //                 }
    //             })
    //     }
    // }
    //
    // public static startConversion(request: express.Request, response: express.Response) {
    //     // create temp folder if not exist
    //     // check if  [process] file exist and process not running
    //     // copy original file to temp folder
    //     // extract streams
    //     // convert streams to new types
    //     // create new media file
    //     // copy file to original location
    //
    // }

}
