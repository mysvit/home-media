import * as express from 'express';
import {ConfigService} from "../config/config";
import {FileLib} from "../core/file-lib";

export class TransformerApi {

    public router = express.Router();
    public path = '/transformer';

    constructor() {
        this.router.get(this.path + '/media-files', Transformer.getMediaFiles);
    }

}

class Transformer {

    public static getMediaFiles(request: express.Request, response: express.Response) {
        const config = ConfigService.DefaultWindowsConfig()
        FileLib.readDir(config.media_path)
            .subscribe(fileNames => {
                    response.status(200).send(fileNames);
                }
            )
    }

}
