import {Component, Input, OnInit} from "@angular/core";
import {Book} from "../../../../../common/models/entities/book";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: "bk-book-edit",
    templateUrl: "./book-edit.component.html",
    styleUrls: ["./book-edit.component.scss"]
})
export class BookEditComponent implements OnInit {
    
    @Input() public book!: Book;
    
    public form!: FormGroup;
    
    constructor() {
        //
    }
    
    public ngOnInit(): void {
        this.initializeForm();
    }
    
    private initializeForm(): void {
        this.form = new FormGroup({
            title: new FormControl(this.book.title, Validators.required),
            authors: new FormArray(this.getAuthorsGroups()),
            pages: new FormControl(this.book.pages, Validators.required),
            publisher: new FormControl(this.book.publisher, Validators.required),
            publicationYear: new FormControl(this.book.publicationYear, Validators.required),
            releaseDate: new FormControl(this.book.releaseDate, Validators.required),
            isbn: new FormControl(this.book.isbn, Validators.required)
        });
    }
    
    private getAuthorsGroups(): FormGroup[] {
        return this.book.authors
            .map((author) => new FormGroup({
                name: new FormControl(author.name, Validators.required),
                lastname: new FormControl(author.lastname, Validators.required)
            }));
    }
}
