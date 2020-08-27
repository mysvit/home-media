import {Component, Input, OnInit} from '@angular/core';
import {MediaTypes} from '../../../server/shared/classes/media-types'
import {IStreamOut} from '../../../server/shared/classes/media-transformer'

@Component({
    selector: 'app-codec-selector',
    templateUrl: './codec-selector.component.html',
    styleUrls: ['./codec-selector.component.scss']
})
export class CodecSelectorComponent implements OnInit {

    MediaTypes = MediaTypes

    @Input() stream: IStreamOut

    constructor() {
    }

    ngOnInit(): void {

    }

}
