export interface IStreamInfo {
    id: number
    codec_name: string
    codec_type: string

    isExtract: boolean
}

export interface IMediaFileInfo {
    mediaPath: string
    fileName: string
    errorMessage: string
    streamInfo: Array<IStreamInfo>
}

export interface INewStream {
    codec_type: string
}

export interface INewMediaFileInfo {
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
