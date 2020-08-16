export interface StreamInfo {
    id:number
    title:string
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
