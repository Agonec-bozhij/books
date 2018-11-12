import {Injectable} from "@angular/core";
import {BooksRepository} from "../repositories/books.repository";
import {BehaviorSubject, Observable} from "rxjs";
import {Book} from "../models/entities/book";

@Injectable()
export class BooksService {
    
    private booksRepository: BooksRepository;

    constructor(booksRepository: BooksRepository) {
        this.booksRepository = booksRepository;
    }
    
    public getBooks(): Observable<Book[]> {
        return this.booksRepository.getBooks();
    }
    
    public createBook(book: Book): Observable<Book> {
        return this.booksRepository.createBook(book);
    }
    
    public updateBook(book: Book): Observable<Book> {
        return this.booksRepository.updateBook(book);
    }
    
    public deleteBook(book: Book): Observable<void> {
        return this.booksRepository.deleteBook(book);
    }
}
