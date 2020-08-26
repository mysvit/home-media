import {Component, OnInit} from '@angular/core';
import {MediaTransformerService} from '../media-transformer.service'
import {IMediaFileInfo, IStreamInfo} from '../../../server/shared/classes/medial-file-info'
import {IStreamTransformer} from '../../../server/shared/classes/media-transformer'

@Component({
    selector: 'app-stream-selector',
    templateUrl: './stream-selector.component.html',
    styleUrls: ['./stream-selector.component.scss', '../media-transformer.component.scss']
})
export class StreamSelectorComponent implements OnInit {

    constructor(public sMediaTransformer: MediaTransformerService) {
    }

    ngOnInit(): void {
    }

    getFileInfo(mainMedialFile: IMediaFileInfo) {
        this.sMediaTransformer.getFileInfo(mainMedialFile)
    }

    selectForTransformation() {
        this.sMediaTransformer.streamSelector.mediaFiles
            .filter(f => f.streamInfo && f.streamInfo.filter(s => s.checked).length > 0)
            .forEach(mediaFile => {
                mediaFile.streamInfo.forEach(stream => {
                    if (stream.checked) {
                        this.sMediaTransformer.mediaTransformer.streams.push(<IStreamTransformer>{
                            mediaPath: mediaFile.mediaPath,
                            fileName: mediaFile.fileName,
                            sourceStream: <IStreamInfo>stream
                        })
                        stream.checked = false
                    }
                })
            })
    }

    sendForTransformation() {

    }

    removeStream(stream: IStreamTransformer) {
        const index = this.sMediaTransformer.mediaTransformer.streams.findIndex(f => f.sourceStream.id === stream.sourceStream.id)
        this.sMediaTransformer.mediaTransformer.streams.splice(index, 1)
    }

}
