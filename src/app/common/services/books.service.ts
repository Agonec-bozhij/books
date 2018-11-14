import {Injectable} from "@angular/core";
import {BooksRepository} from "../repositories/books.repository";
import {BehaviorSubject, Observable} from "rxjs";
import {Book} from "../models/entities/book";
import {skip, tap} from "rxjs/operators";
import {BookMode} from "../models/enums/book-mode";
import {SortState} from "../models/dtos/sort-state";
import {SortDirection} from "../models/enums/sort-direction";

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
    private sortSubject$ = new BehaviorSubject<SortState>(new SortState());
    private booksRepository: BooksRepository;
    
    constructor(booksRepository: BooksRepository) {
        this.booksRepository = booksRepository;
        this.emitBooks();
        this.books$ = this.booksSubject$.asObservable();
        this.initializeSort();
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
    
    public initializeSort(): void {
        this.setSortUpdates();
        const lsSort = localStorage.getItem("booksSort");
        // const initialSort = lsSort ? new SortState().fromJSON(JSON.parse(lsSort)) : new SortState();
        // this.sortSubject$ = new BehaviorSubject<SortState>(initialSort);
        if (lsSort) {
           this.sortSubject$.next(new SortState().fromJSON(JSON.parse(lsSort)));
        }
    }
    
    public setSortUpdates(): void {
        this.sortSubject$.pipe(skip(1)).subscribe((sort: SortState) => {
            this.emitBooks();
            localStorage.setItem("booksSort", JSON.stringify(sort.toJSON()));
        });
    }
    
    public getSort(): SortState {
        return this.sortSubject$.value;
    }
    
    public setSort(field: string) {
        const currentSort = this.getSort();
        let direction: SortDirection | null = SortDirection.Asc;
        
        if (field === currentSort.field) {
            switch (currentSort.direction) {
                case SortDirection.Asc:
                    direction = SortDirection.Desc;
                    break;
                case SortDirection.Desc:
                    direction = null;
                    break;
                default:
                    direction = SortDirection.Asc;
                    break;
            }
        }
        
        this.sortSubject$.next(new SortState(direction, field));
    }
    
    private emitBooks(): void {
        this.booksRepository.getBooks().subscribe((books) => {
            this.sortBooks(books);
            this.booksSubject$.next(books);
        });
    }
    
    private sortBooks(books): void {
        const currentSort = this.getSort();
        
        if (currentSort.field && books.length && books[0].hasOwnProperty(currentSort.field)) {
            books.sort((b1, b2) => {
                if (b1[currentSort.field] > b2[currentSort.field]) {
                    return currentSort.direction === SortDirection.Asc
                        ? -1
                        : currentSort.direction === SortDirection.Desc
                            ? 1
                            : 0;
                } else if (b1[currentSort.field] < b2[currentSort.field]) {
                    return currentSort.direction === SortDirection.Asc
                        ? 1
                        : currentSort.direction === SortDirection.Desc
                            ? -1
                            : 0;
                }
                
                return 0;
            });
        }
    }
}
