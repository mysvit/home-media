export interface IStreamInfo {
    id: string
    map_id: number
    codec_name: string
    codec_type: string
}

export interface IMediaFileInfo {
    mediaPath: string
    fileName: string
    fileExt: string
    errorMessage: string
    streamInfo: Array<IStreamInfo>
}
