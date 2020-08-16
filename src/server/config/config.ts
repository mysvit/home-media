export class AppConfig {

    mediaPath: string
    ffmpegFilePath: string
    ffprobeFilePath: string

    constructor(obj) {
        if (!obj) {
            return
        }
        if (obj.mediaPath) {
            this.mediaPath = obj.mediaPath
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
                mediaPath: 'c:\\temp\\media',
                ffmpegFilePath: 'c:\\Program Files\\ffmpeg\\bin\\ffmpeg.exe',
                ffprobeFilePath: 'c:\\Program Files\\ffmpeg\\bin\\ffprobe.exe'
            }
        )
    }

    static loadConfig() {
        return ConfigService.DefaultWindowsConfig();
    }

}
