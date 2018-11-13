import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Book} from "../../../../common/models/entities/book";
import {BookMode} from "../../../../common/models/enums/book-mode";
import {BooksService} from "../../../../common/services/books.service";

@Component({
    selector: "bk-book",
    templateUrl: "./book.component.html",
    styleUrls: ["./book.component.scss"]
})
export class BookComponent {
    
    @Input() public book!: Book;
    
    public BookMode = BookMode;
    
    public get mode(): BookMode {
        return this.booksService.mode;
    }
    
    @Output() public readonly close = new EventEmitter<void>();
    
    private booksService: BooksService;
    
    constructor(booksService: BooksService) {
        this.booksService = booksService;
    }
    
    public onClose(): void {
        this.booksService.mode = BookMode.Hidden;
    }
    
    public onEdit(): void {
        this.booksService.mode = BookMode.Edit;
    }
    
    public onCancel(): void {
        this.booksService.mode = BookMode.View;
    }
}
