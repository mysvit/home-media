export interface IStreamInfo {
    id: string
    map_id: number
    codec_name: string
    codec_type: string

    isExtract: boolean
}

export interface IMediaFileInfo {
    mediaPath: string
    fileName: string
    fileExt: string
    errorMessage: string
    streamInfo: Array<IStreamInfo>
}

export interface INewStream {
    id: string
    codec_type: string
}

export interface INewMediaFileInfo {
    fileExt: string
    errorMessage: string
    newStream: Array<INewStream>
}

export interface IMediaContainer {
    mainMedialFile: IMediaFileInfo
    newMedialFile: INewMediaFileInfo
}

export interface IMediaInfo {
    mediaPath: string
    mediaContainer: Array<IMediaContainer>
}
