import {IMediaFileInfo} from './medial-file-info'

export interface IMediaSelector {
    mediaPath: string
    mediaFiles: Array<IMediaFileInfo>
}
