import * as fs from 'fs';
import {mkdir, readdir} from 'fs';
import {bindNodeCallback} from "rxjs";
import {rimraf} from 'rimraf';

export class FileLib {

    static readDir(dirName) {
        return bindNodeCallback(readdir)(dirName)
    }

    static mkDir(dirName) {
        return bindNodeCallback(mkdir)(dirName)
    }

    static delNotEmptyDir(dirName) {
        return bindNodeCallback(rimraf)(dirName)
    }

    static readFile(fileName) {
        return bindNodeCallback(fs.readFile)(fileName)
    }

    static copyFile(srcFileName, dstFileName) {
        return bindNodeCallback(fs.copyFile)(srcFileName, dstFileName)
    }

}
