import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from "@angular/core";
import {Book} from "../../../../../common/models/entities/book";
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {fromEvent, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {BooksService} from "../../../../../common/services/books.service";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: "bk-book-edit",
    templateUrl: "./book-edit.component.html",
    styleUrls: ["./book-edit.component.scss"]
})
export class BookEditComponent implements OnInit, AfterViewInit, OnDestroy {
    
    @Input() public book!: Book;
    
    public form!: FormGroup;
    
    @Output() public readonly cancel = new EventEmitter<void>();
    
    @ViewChild("imageInput") public imageInput: ElementRef<HTMLInputElement>;
    
    private booksService: BooksService;
    private toastrService: ToastrService;
    
    private destroy$ = new Subject<void>();
    
    constructor(booksService: BooksService, toastrService: ToastrService) {
        this.booksService = booksService;
        this.toastrService = toastrService;
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
    
    public getAuthorsArray(): AbstractControl[] {
        return (this.form.get("authors") as FormArray).controls;
    }
    
    public onAddAuthor(): void {
        (this.form.get("authors") as FormArray).push(new FormGroup({
            name: new FormControl("", Validators.required),
            lastname: new FormControl("", Validators.required)
        }));
    }
    
    public onDeleteAuthor(index: number): void {
        (this.form.get("authors") as FormArray).removeAt(index);
    }
    
    public onCancel(): void {
        this.cancel.next();
    }
    
    public onSubmit(): void {
        if (this.form.valid) {
            const book = new Book().fromJSON(this.form.value);
            this.booksService.updateBook(book).subscribe(
                () => this.toastrService.success(`Книга ${book.title} сохранена успешно`),
                () => this.toastrService.success(`Произошла ошибка при сохранении книги ${book.title}`)
            );
        }
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
            const reader = new FileReader();
            const file: File = (event.target as HTMLInputElement).files[0];
            reader.onloadend = () => {
                this.form.get("image").setValue(reader.result);
            };
            
            reader.readAsDataURL(file);
        });
    }
}
