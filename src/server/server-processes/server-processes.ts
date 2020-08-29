import {ConfigService} from '../config/config'
import {QueryProcesses} from './query-processes'

export class ServerProcesses {

    public static startService() {
        const config = ConfigService.loadConfig()
        QueryProcesses.checkQuery(config).subscribe()
    }

}
