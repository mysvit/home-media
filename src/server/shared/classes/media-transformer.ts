import {IStreamInfo} from './medial-file-info'

export interface IStreamOut {
    id: string
    map_id: number
    codec_name: string
    codec_type: string
}

export interface IStreamTransformer {
    mediaPath: string
    fileName: string
    fileExt: string
    errorMessage: string
    sourceStream: IStreamInfo
    outStreams: Array<IStreamOut>
}

export interface IMediaTransformer {
    mediaPath: string
    fileName: string
    fileExt: string
    errorMessage: string

    streams: Array<IStreamTransformer>
}
