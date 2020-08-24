import {Component, ElementRef, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
    IMediaContainer,
    IMediaFileInfo,
    IMediaInfo,
    INewMediaFileInfo,
    INewStream,
    IStreamInfo
} from '../server/shared/classes/medial-file-info'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    mediaInfo: IMediaInfo = <IMediaInfo>{mediaPath: 'c:\\temp\\home_media\\media'};

    @ViewChild('ffmpegOUT') ffmpegOUT: ElementRef

    constructor(private httpClient: HttpClient) {
    }

    getMediaInfo(): void {
        this.httpClient.post<any>('api/transformer/get-media-info', this.mediaInfo)
            .subscribe((medialInfo: IMediaInfo) => this.mediaInfo = medialInfo);
    }

    getFileInfo(mfi: IMediaFileInfo) {
        // const medialFileInfo = <IMedialFileInfo>{fileName: file.fileName}
        this.httpClient.post<any>('api/transformer/get-media-file-info', mfi)
            .subscribe((resMedialFileInfo: IMediaFileInfo) => {
                mfi.errorMessage = resMedialFileInfo.errorMessage
                mfi.streamInfo = resMedialFileInfo.streamInfo
            });
    }

    markToConvert(mediaContainer: IMediaContainer) {
        mediaContainer.newMedialFile = <INewMediaFileInfo>{fileExt: '.mkv', newStream: []}
        mediaContainer.mainMedialFile.streamInfo.forEach(stream => {
            stream.isExtract = true
            mediaContainer.newMedialFile.newStream.push(<INewStream>{id: stream.id, codec_type: stream.codec_type})
        })
    }

    getMediaFileStreams(file: IMediaFileInfo) {
        file.streamInfo[1].isExtract = true

        this.httpClient.post('api/transformer/get-media-file-streams', file)
            .subscribe(out => {
                console.log(out)
                this.ffmpegOUT.nativeElement.innerText = out
            });
    }


    getNewStream(mainStream: IStreamInfo, newMedialFile: INewMediaFileInfo) {
        return newMedialFile.newStream.filter(f => f.id === mainStream.id)
    }

}

