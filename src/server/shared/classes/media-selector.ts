import {IMediaFileInfo} from './medial-file-info'

export interface IMediaSelector {
    mediaPath: string
    errorMessage: string
    mediaFiles: Array<IMediaFileInfo>
}
