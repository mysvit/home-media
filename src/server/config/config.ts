export class AppConfig {

    userPath: string
    tempPath: string
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
            {
                userPath: 'c:\\temp\\home_media\\user',
                tempPath: 'c:\\temp\\home_media\\temp',
                ffmpegFilePath: 'c:\\Program Files\\ffmpeg\\bin\\ffmpeg.exe',
                ffprobeFilePath: 'c:\\Program Files\\ffmpeg\\bin\\ffprobe.exe'
            }
        )
    }

    static loadConfig() {
        return ConfigService.DefaultWindowsConfig();
    }

}
