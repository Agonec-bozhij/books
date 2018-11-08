import {Injectable} from "@angular/core";
import {BooksRepository} from "../repositories/books.repository";
import {Observable} from "rxjs";
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
}
