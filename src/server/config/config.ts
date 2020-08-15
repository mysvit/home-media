export class AppConfig {

    media_path: string

    constructor(obj) {
        if (!obj) {
            return
        }
        if (obj.media_path) {
            this.media_path = obj.media_path
        }
    }

}

export class ConfigService {

    static DefaultWindowsConfig() {
        return new AppConfig(
            {
                media_path: 'c:\\temp\\media'
            }
        )
    }

    static loadConfig() {
        return ConfigService.DefaultWindowsConfig();
    }

}
