import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {ShellComponent} from "./common/components/shell/shell.component";
import {HeaderComponent} from "./common/components/header/header.component";
import {SidenavComponent} from "./common/components/sidenav/sidenav.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialModule} from "./common/modules/material.module";
import {HomeComponent} from "./common/components/home/home.component";
import {HttpClientModule} from "@angular/common/http";
import {REPOSITORIES_BARREL} from "./common/repositories/repositories-barrel";
import {SERVICES_BARREL} from "./common/services/services-barrel";
import {ToastrModule} from "ngx-toastr";

@NgModule({
    declarations: [
        AppComponent,
        ShellComponent,
        HeaderComponent,
        SidenavComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        MaterialModule,
        ToastrModule.forRoot()
    ],
    providers: [
        REPOSITORIES_BARREL,
        SERVICES_BARREL
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
