import {bindNodeCallback} from 'rxjs'
import {exec} from 'child_process'

export class ExecLib {

    static exec(command) {
        return bindNodeCallback(exec)(command)
    }

}
