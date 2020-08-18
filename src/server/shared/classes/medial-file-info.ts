export interface StreamInfo {
    id: number
    codec_name: string
    codec_type: string

    isExtract: boolean
}

export interface MedialFileInfo {

    fileName: string
    streamInfo: Array<StreamInfo>

    // constructor(obj) {
    //     if (!obj) {
    //         return
    //     }
    //     if (obj.fileName) {
    //         this.fileName = obj.fileName
    //     }
    // }

}
