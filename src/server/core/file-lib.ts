import {readdir} from 'fs';
import {bindNodeCallback} from "rxjs";
import * as fs from 'fs'

export class FileLib {

    static readDir(dirName) {
        return bindNodeCallback(readdir)(dirName)
    }

    static readFile(fileName) {
        return bindNodeCallback(fs.readFile)(fileName)
    }

}
