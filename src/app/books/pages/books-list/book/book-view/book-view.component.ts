import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Book} from "../../../../../common/models/entities/book";

@Component({
    selector: "bk-book-view",
    templateUrl: "./book-view.component.html",
    styleUrls: ["./book-view.component.scss"]
})
export class BookViewComponent {
    
    @Input() public book!: Book;
    
    @Output() public readonly edit = new EventEmitter<void>();
    
    constructor() {
        //
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
}
