import {Component, OnInit} from '@angular/core';
import {MediaTransformerService} from '../media-transformer.service'
import {IMediaFileInfo} from '../../../server/shared/classes/medial-file-info'

@Component({
    selector: 'app-media-selector',
    templateUrl: './media-selector.component.html',
    styleUrls: ['./media-selector.component.scss', '../media-transformer.component.scss']
})
export class MediaSelectorComponent implements OnInit {

    constructor(public sMediaTransformer: MediaTransformerService) {
    }

    ngOnInit(): void {
    }

    getMediaInfo() {
        this.sMediaTransformer.getMediaInfo()
    }

    getFileInfo(mainMedialFile: IMediaFileInfo) {
        this.sMediaTransformer.getFileInfo(mainMedialFile)
    }

    selectForTransformation() {
        this.sMediaTransformer.isMediaSelector = false
    }

    addFileToTransform(mediaFile: IMediaFileInfo) {
        if (!this.sMediaTransformer.streamSelector.mediaFiles) {
            this.sMediaTransformer.streamSelector.mediaFiles = []
        }
        this.sMediaTransformer.streamSelector.mediaFiles.push(mediaFile)
        const index = this.sMediaTransformer.mediaSelector.mediaFiles.findIndex(f => f.fileName === mediaFile.fileName)
        this.sMediaTransformer.mediaSelector.mediaFiles.splice(index, 1)
    }

    addFileToSelector(mediaFileTrans: IMediaFileInfo) {
        this.sMediaTransformer.mediaSelector.mediaFiles.push(mediaFileTrans)
        const index = this.sMediaTransformer.streamSelector.mediaFiles.findIndex(f => f.fileName === mediaFileTrans.fileName)
        this.sMediaTransformer.streamSelector.mediaFiles.splice(index, 1)
    }

}
