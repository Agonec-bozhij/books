import {AfterContentInit, Component, ContentChild, ViewChild} from "@angular/core";
import {HeaderComponent} from "../header/header.component";
import {MatSidenav} from "@angular/material";

@Component({
    selector: "bk-sidenav",
    templateUrl: "./sidenav.component.html",
    styleUrls: ["./sidenav.component.scss"]
})
export class SidenavComponent implements AfterContentInit {
    
    @ViewChild(MatSidenav) private sidenav: MatSidenav;
    @ContentChild(HeaderComponent) private header!: HeaderComponent;
    
    constructor() {
        //
    }
    
    public ngAfterContentInit(): void {
        this.header.getHeaderClickStream().pipe(
        )
            .subscribe(() => {
                this.sidenav.toggle();
            });
    }
}
