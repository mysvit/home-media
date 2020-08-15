import * as express from 'express';

export class TransformerApi {

    public router = express.Router();
    public path = '/transformer';

    constructor() {
        this.router.get(this.path + '/media-files', Transformer.getMediaFiles);
    }

}

class Transformer {

    public static getMediaFiles(request: express.Request, response: express.Response) {
        console.log('getMediaFiles');
        response.status(200).send('TEST');
    }

}
