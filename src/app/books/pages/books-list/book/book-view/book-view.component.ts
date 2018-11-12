import {Component, Input} from "@angular/core";
import {Book} from "../../../../../common/models/entities/book";

@Component({
    selector: "bk-book-view",
    templateUrl: "./book-view.component.html",
    styleUrls: ["./book-view.component.scss"]
})
export class BookViewComponent {
    
    @Input() public book!: Book;
    
    constructor() {
        //
    }
    
    public getHumanReadableAuthors(): string {
        const authors: string[] = [];
        
        this.book.authors
            .forEach((author) => authors.push(`${author.name[0]}. ${author.lastname}`));
        
        return authors.join(",");
    }
}
