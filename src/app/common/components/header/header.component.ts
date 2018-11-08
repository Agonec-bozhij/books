import {Component} from "@angular/core";
import {Observable, Subject} from "rxjs";

@Component({
    selector: "bk-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"]
})
export class HeaderComponent {
    
    private headerClicked$ = new Subject<void>();
    
    constructor() {
        //
    }
    
    public getHeaderClickStream(): Observable<void> {
        return this.headerClicked$.asObservable();
    }
    
    public onClickTitle(): void {
        this.headerClicked$.next();
    }
}
