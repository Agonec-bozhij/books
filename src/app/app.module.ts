import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {ShellComponent} from "./common/components/shell/shell.component";
import {HeaderComponent} from "./common/components/header/header.component";
import {SidenavComponent} from "./common/components/sidenav/sidenav.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialModule} from "./common/modules/material.module";

@NgModule({
    declarations: [
        AppComponent,
        ShellComponent,
        HeaderComponent,
        SidenavComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MaterialModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
