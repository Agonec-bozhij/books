import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {Book} from "../../../../../common/models/entities/book";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {fromEvent, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
    selector: "bk-book-edit",
    templateUrl: "./book-edit.component.html",
    styleUrls: ["./book-edit.component.scss"]
})
export class BookEditComponent implements OnInit, AfterViewInit, OnDestroy {
    
    @Input() public book!: Book;
    
    public form!: FormGroup;
    
    @ViewChild("imageInput") public imageInput: ElementRef<HTMLInputElement>;
    
    private destroy$ = new Subject<void>();
    
    constructor() {
        //
    }
    
    public ngOnInit(): void {
        this.initializeForm();
    }
    
    public ngAfterViewInit(): void {
        this.subscribeImageInput();
    }
    
    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
    
    private initializeForm(): void {
        this.form = new FormGroup({
            title: new FormControl(this.book.title, Validators.required),
            authors: new FormArray(this.getAuthorsGroups()),
            pages: new FormControl(this.book.pages, Validators.required),
            publisher: new FormControl(this.book.publisher, Validators.required),
            publicationYear: new FormControl(this.book.publicationYear, Validators.required),
            releaseDate: new FormControl(this.book.releaseDate, Validators.required),
            isbn: new FormControl(this.book.isbn, Validators.required),
            image: new FormControl(this.book.image)
        });
    }
    
    private getAuthorsGroups(): FormGroup[] {
        return this.book.authors
            .map((author) => new FormGroup({
                name: new FormControl(author.name, Validators.required),
                lastname: new FormControl(author.lastname, Validators.required)
            }));
    }
    
    private subscribeImageInput(): void {
        fromEvent(this.imageInput.nativeElement, "change").pipe(
            takeUntil(this.destroy$)
        ).subscribe((event: Event) => {
            console.log("event", event);
            
            const reader = new FileReader();
            const file: File = (event.target as HTMLInputElement).files[0];
            reader.onloadend = () => {
                this.form.get("image").setValue(reader.result);
            };
            
            reader.readAsDataURL(file);
        });
    }
}
