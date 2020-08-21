import {Component, ElementRef, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IMedialFileInfo, IMedialInfo} from '../server/shared/classes/medial-file-info'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    medialInfo: IMedialInfo = <IMedialInfo>{mediaPath:'c:\\temp\\home_media\\media'};

    @ViewChild('ffmpegOUT') ffmpegOUT: ElementRef

    constructor(private httpClient: HttpClient) {
    }

    getMediaInfo(): void {
        this.httpClient.post<any>('api/transformer/get-media-info', this.medialInfo)
            .subscribe((medialInfo: IMedialInfo) => this.medialInfo = medialInfo);
    }

    getFileInfo(mfi: IMedialFileInfo) {
        // const medialFileInfo = <IMedialFileInfo>{fileName: file.fileName}
        this.httpClient.post<any>('api/transformer/get-media-file-info', mfi)
            .subscribe((resMedialFileInfo: IMedialFileInfo) => {
                mfi.errorMessage = resMedialFileInfo.errorMessage
                mfi.streamInfo = resMedialFileInfo.streamInfo
            });
    }

    getMediaFileStreams(file: IMedialFileInfo) {
        file.streamInfo[1].isExtract = true

        this.httpClient.post('api/transformer/get-media-file-streams', file)
            .subscribe(out => {
                console.log(out)
                this.ffmpegOUT.nativeElement.innerText = out
            });
    }

}
