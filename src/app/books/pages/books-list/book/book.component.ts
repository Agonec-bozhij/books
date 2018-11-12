import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Book} from "../../../../common/models/entities/book";

@Component({
    selector: "bk-book",
    templateUrl: "./book.component.html",
    styleUrls: ["./book.component.scss"]
})
export class BookComponent {
    
    @Input() public book!: Book;
    
    @Output() public readonly close = new EventEmitter<void>();
    
    constructor() {
        //
    }
    
    public onClose(): void {
        this.close.next();
    }
}
