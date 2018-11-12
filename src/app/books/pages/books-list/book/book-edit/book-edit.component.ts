import {Component, Input} from "@angular/core";
import {Book} from "../../../../../common/models/entities/book";

@Component({
    selector: "bk-book-edit",
    templateUrl: "./book-edit.component.html",
    styleUrls: ["./book-edit.component.scss"]
})
export class BookEditComponent {
    
    @Input() public book: Book;
}
