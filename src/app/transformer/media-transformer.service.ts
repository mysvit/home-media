import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {IMediaFileInfo} from '../../server/shared/classes/medial-file-info'
import {IMediaSelector} from '../../server/shared/classes/media-selector'
import {IMediaTransformer} from '../../server/shared/classes/media-transformer'

@Injectable({
    providedIn: 'root'
})
export class MediaTransformerService {

    mediaSelector: IMediaSelector = <IMediaSelector>{mediaPath: 'c:\\temp\\home_media\\media'}
    streamSelector: IMediaSelector = <IMediaSelector>{mediaPath: 'c:\\temp\\home_media\\media'}
    mediaTransformer: IMediaTransformer = <IMediaTransformer>{streams: []}

    isMediaSelector: boolean
    isStreamSelector: boolean

    constructor(private httpClient: HttpClient) {
    }

    getMediaInfo(): void {
        this.httpClient.post<any>('api/transformer/get-media-info', this.mediaSelector)
            .subscribe((mediaSelector: IMediaSelector) => this.mediaSelector = mediaSelector);
    }

    getFileInfo(mfi: IMediaFileInfo) {
        this.httpClient.post<any>('api/transformer/get-media-file-info', mfi)
            .subscribe((resMedialFileInfo: IMediaFileInfo) => {
                mfi.errorMessage = resMedialFileInfo.errorMessage
                mfi.streamInfo = resMedialFileInfo.streamInfo
            });
    }

    // markToConvert(mediaContainer: IMediaContainer) {
    //     mediaContainer.newMedialFile = <INewMediaFileInfo>{fileExt: '.mkv', newStream: []}
    //     mediaContainer.mainMedialFile.streamInfo.forEach(stream => {
    //         stream.isExtract = true
    //         mediaContainer.newMedialFile.newStream.push(<INewStream>{id: stream.id, codec_type: stream.codec_type})
    //     })
    // }

}
