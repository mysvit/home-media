import {AppConfig} from '../config/config'
import {interval} from 'rxjs'
import {map} from 'rxjs/operators'
import {FileLib} from '../core/file-lib'
import {IStreamTransformer} from '../shared/classes/media-transformer'
import * as path from 'path'
import {TransformerProcess} from './transformer-process'

export class QueryProcesses {

    public static checkQuery(config: AppConfig) {
        return interval(config.queryInterval).pipe(map(() => QueryProcesses.checkQueryFolder(config)))
    }

    public static checkQueryFolder(config: AppConfig) {
        console.log('checkQueryFolder')
        FileLib.readDir(config.queryPath)
            .subscribe((fileNames: Array<string>) => {
                fileNames.map(fileName => QueryProcesses.queryFactory(path.join(config.queryPath, fileName))
                )
            })
    }

    public static queryFactory(fileName: string) {
        FileLib.readFile(fileName).subscribe(data => {
            switch (QueryProcesses.getQueryType(fileName)) {
                case QueryType.Transformer:
                    TransformerProcess.startTransformation(data)
                    break
            }
        });
    }

    private static getQueryType(fileName: string) {
        if (fileName.indexOf('transformer')) {
            return QueryType.Transformer
        }
    }
}

enum QueryType {
    Transformer
}
