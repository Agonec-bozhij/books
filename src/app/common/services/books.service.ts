import {Injectable} from "@angular/core";
import {BooksRepository} from "../repositories/books.repository";
import {BehaviorSubject, Observable} from "rxjs";
import {Book} from "../models/entities/book";
import {tap} from "rxjs/operators";
import {BookMode} from "../models/enums/book-mode";

@Injectable()
export class BooksService {
    
    public books$: Observable<Book[]>;
    
    public get mode(): BookMode {
        return this.bookMode;
    }
    public set mode(value: BookMode) {
        this.bookMode = value;
    }
    
    private selectedBook: Book | null = null;
    private bookMode: BookMode = BookMode.Hidden;
    private booksSubject$ = new BehaviorSubject<Book[]>([]);
    private booksRepository: BooksRepository;

    constructor(booksRepository: BooksRepository) {
        this.booksRepository = booksRepository;
        this.emitBooks();
        this.books$ = this.booksSubject$.asObservable();
    }
    
    public getSelectedBook(): Book | null {
        return this.selectedBook;
    }
    
    public selectBook(book: Book): void {
        this.selectedBook = book;
    }
    
    public deselectBook(): void {
        this.selectedBook = null;
    }
    
    public createBook(book: Book): Observable<Book> {
        return this.booksRepository.createBook(book).pipe(
            tap((newBook) => {
                this.emitBooks();
                this.selectBook(newBook);
                this.mode = BookMode.View;
            })
        );
    }
    
    public updateBook(book: Book): Observable<Book> {
        return this.booksRepository.updateBook(book).pipe(
            tap((newBook) => {
                this.emitBooks();
                this.selectBook(newBook);
                this.mode = BookMode.View;
            })
        );
    }
    
    public deleteBook(book: Book): Observable<void> {
        return this.booksRepository.deleteBook(book).pipe(
            tap(() => {
                this.emitBooks();
                this.deselectBook();
                this.mode = BookMode.Hidden;
            })
        );
    }
    
    private emitBooks(): void {
        this.booksRepository.getBooks().subscribe((books) => this.booksSubject$.next(books));
    }
}
