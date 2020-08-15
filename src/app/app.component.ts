import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    files: Array<string>;

    constructor(private httpClient: HttpClient) {
    }

    runServer(): void {
        this.httpClient.get<any>('api/transformer/media-files')
            .subscribe(files => this.files = files);
    }

}
