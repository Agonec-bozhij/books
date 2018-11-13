import {Component, OnDestroy, OnInit} from "@angular/core";
import {BooksService} from "../../../common/services/books.service";
import {Book} from "../../../common/models/entities/book";
import {takeUntil} from "rxjs/operators";
import {bookListTrigger, BookState, bookTrigger} from "../../../common/animations/collapse.animations";
import {Subject} from "rxjs";
import {BookMode} from "../../../common/models/enums/book-mode";

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
    
    public books: Book[] = [];
    
    private booksService: BooksService;
    private destroy$ = new Subject<void>();
    
    constructor(booksService: BooksService) {
        this.booksService = booksService;
    }
    
    public ngOnInit() {
        this.booksService.books$.pipe(
            takeUntil(this.destroy$)
        )
            .subscribe((books: Book[]) => {
                this.books = books;
            });
    }
    
    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
    
    public onClickRow(event: Book): void {
        this.booksService.selectBook(event);
        this.booksService.mode = BookMode.View;
    }
    
    public onCreateBook(): void {
        this.booksService.deselectBook();
        this.booksService.mode = BookMode.Create;
    }
    
    public bookHidden(): boolean {
        return this.booksService.mode === BookMode.Hidden;
    }
    
    public onHideBook(): void {
        this.booksService.deselectBook();
        this.booksService.mode = BookMode.Hidden;
    }
    
    public getCardCollapsedState(): BookState {
        return this.bookHidden() ? BookState.Collapsed : BookState.Expanded;
    }
    
    public getListCollpasedState(): BookState {
        return this.bookHidden() ? BookState.Expanded : BookState.Collapsed;
    }
}
