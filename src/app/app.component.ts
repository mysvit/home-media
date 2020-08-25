import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor() {
    }


    //
    //
    // getMediaFileStreams(file: IMediaFileInfo) {
    //     file.streamInfo[1].isExtract = true
    //
    //     this.httpClient.post('api/transformer/get-media-file-streams', file)
    //         .subscribe(out => {
    //             console.log(out)
    //             this.ffmpegOUT.nativeElement.innerText = out
    //         });
    // }
    //
    //
    // getNewStream(mainStream: IStreamInfo, newMedialFile: INewMediaFileInfo) {
    //     return newMedialFile.newStream.filter(f => f.id === mainStream.id)
    // }

}

