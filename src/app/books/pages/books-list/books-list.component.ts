import {Component, OnInit} from "@angular/core";
import {BooksService} from "../../../common/services/books.service";
import {Book} from "../../../common/models/entities/book";
import {take} from "rxjs/operators";

@Component({
    selector: "bk-books-list",
    templateUrl: "./books-list.component.html",
    styleUrls: ["./books-list.component.scss"]
})
export class BooksListComponent implements OnInit {
    
    private books: Book[] = [];
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
    
}
