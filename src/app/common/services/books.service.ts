import {Injectable} from "@angular/core";
import {BooksRepository} from "../repositories/books.repository";
import {BehaviorSubject, Observable} from "rxjs";
import {Book} from "../models/entities/book";
import {tap} from "rxjs/operators";

@Injectable()
export class BooksService {
    
    public books$: Observable<Book[]>;
    
    private booksSubject$ = new BehaviorSubject<Book[]>([]);
    private booksRepository: BooksRepository;

    constructor(booksRepository: BooksRepository) {
        this.booksRepository = booksRepository;
        this.emitBooks();
        this.books$ = this.booksSubject$.asObservable();
    }
    
    public createBook(book: Book): Observable<Book> {
        return this.booksRepository.createBook(book).pipe(
            tap(() => this.emitBooks())
        );
    }
    
    public updateBook(book: Book): Observable<Book> {
        return this.booksRepository.updateBook(book).pipe(
            tap(() => this.emitBooks())
        );
    }
    
    public deleteBook(book: Book): Observable<void> {
        return this.booksRepository.deleteBook(book).pipe(
            tap(() => this.emitBooks())
        );
    }
    
    private emitBooks(): void {
        this.booksRepository.getBooks().subscribe((books) => this.booksSubject$.next(books));
    }
}
