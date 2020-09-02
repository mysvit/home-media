import {Component, OnInit} from '@angular/core';
import {MediaTransformerService} from '../media-transformer.service'
import {IMediaFileInfo, IStreamInfo} from '../../../server/shared/classes/medial-file-info'
import {IStreamOut, IStreamTransformer} from '../../../server/shared/classes/media-transformer'
import {MediaTypes} from 'src/server/shared/classes/media-types';
import {v4 as uuid4} from 'uuid';

@Component({
    selector: 'app-stream-selector',
    templateUrl: './stream-selector.component.html',
    styleUrls: ['./stream-selector.component.scss', '../media-transformer.component.scss']
})
export class StreamSelectorComponent implements OnInit {

    MediaTypes = MediaTypes

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
                            sourceStream: <IStreamInfo>stream,
                            outStreams: [<IStreamOut>{id: uuid4(), codec_type: stream.codec_type, codec_name: stream.codec_name}],
                        })
                        stream.checked = false
                    }
                })
            })
        this.sMediaTransformer.mediaTransformer.fileName = this.sMediaTransformer.mediaTransformer.streams[0].fileName
    }

    sendForTransformation() {
        console.log(JSON.stringify(this.sMediaTransformer.mediaTransformer))
    }

    removeStream(stream: IStreamTransformer) {
        const index = this.sMediaTransformer.mediaTransformer.streams.findIndex(f => f.sourceStream.id === stream.sourceStream.id)
        this.sMediaTransformer.mediaTransformer.streams.splice(index, 1)
    }

    addCopyStream(stream: IStreamTransformer) {
        stream.outStreams.push(<IStreamOut>{codec_type: stream.sourceStream.codec_type, codec_name: stream.sourceStream.codec_name})
    }

    delCopyStream(stream: IStreamTransformer, outStream: IStreamOut) {
        const index = stream.outStreams.findIndex(f => f.id === outStream.id)
        stream.outStreams.splice(index, 1)
    }

}
