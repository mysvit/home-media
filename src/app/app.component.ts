import {Component, ElementRef, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IMediaFileInfo, IMediaInfo} from '../server/shared/classes/medial-file-info'

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

    markToConvert(file: IMediaFileInfo) {

    }

    getMediaFileStreams(file: IMediaFileInfo) {
        file.streamInfo[1].isExtract = true

        this.httpClient.post('api/transformer/get-media-file-streams', file)
            .subscribe(out => {
                console.log(out)
                this.ffmpegOUT.nativeElement.innerText = out
            });
    }

}
