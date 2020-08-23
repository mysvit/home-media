import {bindNodeCallback} from 'rxjs'
import {ChildProcess, exec, ExecException, ExecOptions} from 'child_process'

export class ExecLib {

    static exec(command: string, options: ExecOptions) {
        return bindNodeCallback(execWithOption)(command, options)
    }

}

function execWithOption(command: string,
                        options: ExecOptions,
                        callback?: (error: ExecException | null, stdout: string, stderr: string) => void): ChildProcess {
    return exec(command, options, callback)
}
