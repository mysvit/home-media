import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from '@angular/forms';
import {StreamSelectorComponent} from './transformer/stream-selector/stream-selector.component';
import {MediaSelectorComponent} from './transformer/media-selector/media-selector.component'
import {MediaTransformerService} from './transformer/media-transformer.service'
import {MediaTransformerComponent} from './transformer/media-transformer.component'

@NgModule({
    declarations: [
        AppComponent,
        MediaTransformerComponent,
        StreamSelectorComponent,
        MediaSelectorComponent
    ],
    imports: [
        HttpClientModule,
        BrowserModule.withServerTransition({appId: 'serverApp'}),
        FormsModule
    ],
    providers: [MediaTransformerService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
