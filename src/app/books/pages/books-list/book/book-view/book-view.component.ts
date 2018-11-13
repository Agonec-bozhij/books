import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Book} from "../../../../../common/models/entities/book";
import {ToastrService} from "ngx-toastr";
import {Subject} from "rxjs";
import {BooksService} from "../../../../../common/services/books.service";

@Component({
    selector: "bk-book-view",
    templateUrl: "./book-view.component.html",
    styleUrls: ["./book-view.component.scss"]
})
export class BookViewComponent {
    
    @Input() public book!: Book;
    
    @Output() public readonly edit = new EventEmitter<void>();
    
    private booksService: BooksService;
    private toastrService: ToastrService;
    
    constructor(booksService: BooksService, toastrService: ToastrService) {
        this.booksService = booksService;
        this.toastrService = toastrService;
    }
    
    public getHumanReadableAuthors(): string {
        const authors: string[] = [];
        
        this.book.authors
            .forEach((author) => authors.push(`${author.name[0]}. ${author.lastname}`));
        
        return authors.join(",");
    }
    
    public onEdit(): void {
        this.edit.next();
    }
    
    public onDelete(): void {
        const bookTitle = this.book.title;
        this.booksService.deleteBook(this.book).subscribe(
            () => this.toastrService.success(`Книга ${bookTitle} сохранена успешно`),
            () => this.toastrService.success(`Произошла ошибка при сохранении книги ${bookTitle}`)
        );
    }
}
