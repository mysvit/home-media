import {IMediaTransformer} from '../shared/classes/media-transformer'
import {ConfigService} from '../config/config'
import {forkJoin, of, throwError} from 'rxjs'
import {catchError, map} from 'rxjs/operators'
import {FFmpegCommands} from '../core/ffmpeg-lib'
import {FileLib} from '../core/file-lib'

export class TransformerProcess {

    static config = ConfigService.loadConfig()

    public static startTransformation(data) {
        const mediaTransformer = <IMediaTransformer>JSON.parse(data)
        return this.createMediaFolderInTemp(mediaTransformer)
            .pipe(
                map(result => console.log('result', result)),
                catchError(error => {
                    console.log('error', error)
                    return of(false)
                })
            )
        // create temp folder if not exist
        // check if  [process] file exist and process not running
        // copy original file to temp folder
        // extract streams
        // convert streams to new types
        // create new media file
        // copy file to original location
    }

    static createMediaFolderInTemp(mediaTransformer: IMediaTransformer) {
        const listOfMediaDir: Array<string> = []
        mediaTransformer.streams.forEach(stream => {
            const uniquePath = FFmpegCommands.getMediaExtractTempFolderFullPath(stream.fileName)
            if (listOfMediaDir.findIndex(f => f === uniquePath) < 0) {
                listOfMediaDir.push(uniquePath)
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
