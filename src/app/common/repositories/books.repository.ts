import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {Book} from "../models/entities/book";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable()
export class BooksRepository {
    
    private http: HttpClient;
    
    constructor(http: HttpClient) {
        this.http = http;
    }
    
    public getBooks(): Observable<Book[]> {
        return this.http.get<Book[]>("/assets/initial-data/books.json")
            .pipe(
                map((books) => books.map((book) => new Book().fromJSON(book)))
            );
    }
}
