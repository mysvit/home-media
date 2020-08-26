import {Component, OnInit} from '@angular/core';
import {MediaTransformerService} from './media-transformer.service'

@Component({
    selector: 'app-media-transformer',
    templateUrl: './media-transformer.component.html',
    styleUrls: ['./media-transformer.component.scss']
})
export class MediaTransformerComponent implements OnInit {

    constructor(public sMediaTransformer: MediaTransformerService) {
    }

    ngOnInit(): void {
    }

    selectMediasForTransformation() {
        this.sMediaTransformer.isMediaSelector = true
    }

    selectStreamsForTransformation() {
        this.sMediaTransformer.isStreamSelector = true
    }

}
