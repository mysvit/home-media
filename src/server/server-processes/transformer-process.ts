import {IStreamTransformer} from '../shared/classes/media-transformer'
import * as path from 'path'

export class TransformerProcess {

    public static startTransformation(data) {
        const streams = <Array<IStreamTransformer>>JSON.parse(data);
        streams.forEach(stream => {
            path.join(stream.mediaPath, stream.fileName)
        })
    }

}
