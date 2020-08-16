import {Component, ElementRef, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MedialFileInfo} from '../server/shared/classes/medial-file-info'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    files: Array<MedialFileInfo>;

    constructor(private httpClient: HttpClient) {
    }

    runServer(): void {
        this.httpClient.get<any>('api/transformer/get-media-files')
            .subscribe(files => this.files = files.map(file => <MedialFileInfo>{fileName: file}));
    }

    getFileInfo(file: MedialFileInfo) {
        const medialFileInfo = <MedialFileInfo>{fileName: file.fileName}
        this.httpClient.post<any>('api/transformer/get-media-file-info', medialFileInfo)
            .subscribe((info: MedialFileInfo) => {
                file.streamInfo = info.streamInfo
            });
    }

}
