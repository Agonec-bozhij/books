import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Book} from "../../../../common/models/entities/book";

@Component({
    selector: "bk-book-view",
    templateUrl: "./book-view.component.html",
    styleUrls: ["./book-view.component.scss"]
})
export class BookViewComponent {
    
    @Input() public book!: Book;
    
    @Output() public readonly close = new EventEmitter<void>();
    
    constructor() {
        //
    }
    
    public onClose(): void {
        this.close.next();
    }
}
