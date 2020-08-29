export class AppConfig {

    userPath: string
    tempPath: string
    queryPath: string
    queryInterval: number
    ffmpegFilePath: string
    ffprobeFilePath: string

    constructor(obj) {
        if (!obj) {
            return
        }
        if (obj.userPath) {
            this.userPath = obj.userPath
        }
        if (obj.tempPath) {
            this.tempPath = obj.tempPath
        }
        if (obj.queryPath) {
            this.queryPath = obj.queryPath
        }
        if (obj.queryInterval) {
            this.queryInterval = obj.queryInterval
        }
        if (obj.ffmpegFilePath) {
            this.ffmpegFilePath = obj.ffmpegFilePath
        }
        if (obj.ffprobeFilePath) {
            this.ffprobeFilePath = obj.ffprobeFilePath
        }
    }

}

export class ConfigService {

    static DefaultWindowsConfig() {
        return new AppConfig(
            <AppConfig>{
                userPath: 'c:\\temp\\home_media\\user',
                tempPath: 'c:\\temp\\home_media\\temp',
                queryPath: 'c:\\temp\\home_media\\query',
                queryInterval: 60000,
                ffmpegFilePath: 'c:\\Program Files\\ffmpeg\\bin\\ffmpeg.exe',
                ffprobeFilePath: 'c:\\Program Files\\ffmpeg\\bin\\ffprobe.exe'
            }
        )
    }

    static loadConfig() {
        return ConfigService.DefaultWindowsConfig();
    }

}
