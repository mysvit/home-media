export interface IStreamInfo {
    id: number
    codec_name: string
    codec_type: string

    isExtract: boolean
}

export interface IMedialFileInfo {

    mediaPath: string
    fileName: string
    errorMessage: string
    streamInfo: Array<IStreamInfo>

    // constructor(obj) {
    //     if (!obj) {
    //         return
    //     }
    //     if (obj.fileName) {
    //         this.fileName = obj.fileName
    //     }
    // }

}

export interface IMedialInfo {
    mediaPath: string
    medialFileInfo: Array<IMedialFileInfo>
}
