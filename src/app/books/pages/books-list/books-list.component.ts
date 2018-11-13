import {ChangeDetectorRef, Component, OnDestroy, OnInit} from "@angular/core";
import {BooksService} from "../../../common/services/books.service";
import {Book} from "../../../common/models/entities/book";
import {take, takeUntil} from "rxjs/operators";
import {bookListTrigger, BookState, bookTrigger} from "../../../common/animations/collapse.animations";
import {Subject} from "rxjs";

@Component({
    selector: "bk-books-list",
    templateUrl: "./books-list.component.html",
    styleUrls: ["./books-list.component.scss"],
    animations: [
        bookTrigger,
        bookListTrigger
    ]
})
export class BooksListComponent implements OnInit, OnDestroy {
    
    public selectedBook: Book | null = null;
    public books: Book[] = [];
    
    private booksService: BooksService;
    
    private cdr: ChangeDetectorRef;
    private destroy$ = new Subject<void>();
    
    constructor(booksService: BooksService, cdr: ChangeDetectorRef) {
        this.booksService = booksService;
        this.cdr = cdr;
    }
    
    public ngOnInit() {
        this.booksService.books$.pipe(
            takeUntil(this.destroy$)
        )
            .subscribe((books: Book[]) => {
                this.books = books;
    
                const selectedBookExists = this.selectedBook
                    && this.books.find((book) => book.title === this.selectedBook.title);
                
                if (!selectedBookExists) {
                    this.selectedBook = null;
                }
            });
    }
    
    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
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
