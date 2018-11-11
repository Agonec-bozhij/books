import {Component, OnInit} from "@angular/core";
import {BooksService} from "../../../common/services/books.service";
import {Book} from "../../../common/models/entities/book";
import {take} from "rxjs/operators";
import {bookListTrigger, BookState, bookTrigger} from "../../../common/animations/collapse.animations";

@Component({
    selector: "bk-books-list",
    templateUrl: "./books-list.component.html",
    styleUrls: ["./books-list.component.scss"],
    animations: [
        bookTrigger,
        bookListTrigger
    ]
})
export class BooksListComponent implements OnInit {
    
    public selectedBook: Book | null = null;
    public books: Book[] = [];
    
    private booksService: BooksService;
    
    constructor(booksService: BooksService) {
        this.booksService = booksService;
    }
    
    public ngOnInit() {
        this.booksService.getBooks().pipe(
            take(1)
        )
            .subscribe((books) => {
                this.books = books;
            });
    }
    
    public onClickRow(event: Book): void {
        this.selectedBook = event;
    }
    
    public onHideBook(): void {
        this.selectedBook = null;
    }
    
    public getCardCollapsedState(): BookState {
        return this.selectedBook ? BookState.Expanded : BookState.Collapsed;
    }
    
    public getListCollpasedState(): BookState {
        return this.selectedBook ? BookState.Collapsed : BookState.Expanded;
    }
}
