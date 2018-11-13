import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {Book} from "../models/entities/book";
import {HttpClient} from "@angular/common/http";
import {map, switchMap, tap} from "rxjs/operators";

@Injectable()
export class BooksRepository {
    
    private http: HttpClient;
    
    constructor(http: HttpClient) {
        this.http = http;
    }
    
    public getBooks(): Observable<Book[]> {
        const lsBooks = localStorage.getItem("books");
        
        if (lsBooks) {
            return new Observable((observer) => {
                const books: Book[] = JSON.parse(lsBooks).map((book) => new Book().fromJSON(book));
                
                observer.next(books);
                observer.complete();
            });
        } else {
            return this.http.get<Book[]>("/assets/initial-data/books.json")
                .pipe(
                    map((books) => books.map((book) => new Book().fromJSON(book))),
                    tap((books) => this.saveBooksToLocalStorage(books))
                );
        }
    }
    
    public createBook(book: Book): Observable<Book> {
        return this.getEditObservable(book, false);
    }
    
    public updateBook(book: Book): Observable<Book> {
        return this.getEditObservable(book, true);
    }
    
    public deleteBook(book: Book): Observable<void> {
        return new Observable((observer) => {
            this.getBooks().subscribe((books: Book[]) => {
                const indexToDelete = books.findIndex((searchBook) => searchBook.title === book.title);
    
                if (indexToDelete >= 0) {
                    books.splice(indexToDelete, 1);
                    this.saveBooksToLocalStorage(books);
                }
                
                observer.next();
                observer.complete();
            });
        });
    }
    
    private getEditObservable(book: Book, edit: boolean): Observable<Book> {
        return new Observable((observer) => {
            this.getBooks()
                .subscribe((books) => {
                    if (edit) {
                        const searchBookIndex = books.findIndex((searchBook) => searchBook.title === book.title);
                        if (searchBookIndex >= 0) {
                            books.splice(searchBookIndex, 1, book);
                        }
                    } else {
                        books.push(book);
                    }
                    
                    this.saveBooksToLocalStorage(books);
                    observer.next(book);
                    observer.complete();
                });
        });
    }
    
    private saveBooksToLocalStorage(books): void {
        const booksString = JSON.stringify(books.map((book) => book.toJSON()));
        localStorage.setItem("books", booksString);
    }
}
