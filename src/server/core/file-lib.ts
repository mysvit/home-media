import {readdir} from 'fs';
import {bindNodeCallback} from "rxjs";

export class FileLib {

    static readDir(dirName) {
        return bindNodeCallback(readdir)(dirName)
    }

}
