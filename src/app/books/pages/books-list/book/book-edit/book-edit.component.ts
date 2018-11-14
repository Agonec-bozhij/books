import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from "@angular/core";
import {Book} from "../../../../../common/models/entities/book";
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {fromEvent, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {BooksService} from "../../../../../common/services/books.service";
import {ToastrService} from "ngx-toastr";
import {BookMode} from "../../../../../common/models/enums/book-mode";
import {Author} from "../../../../../common/models/entities/author";
import {CustomValidators} from "../../../../../common/utils/custom-validators";

@Component({
    selector: "bk-book-edit",
    templateUrl: "./book-edit.component.html",
    styleUrls: ["./book-edit.component.scss"]
})
export class BookEditComponent implements OnInit, AfterViewInit, OnDestroy {
    
    public BookMode = BookMode;
    public form!: FormGroup;
    public minValidDate = new Date(1800, 0, 1);
    
    public get book(): Book {
        return this.booksService.getSelectedBook();
    }
    
    public get mode(): BookMode {
        return this.booksService.mode;
    }
    
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
        console.log("form", this.form);
    }
    
    public onCancel(): void {
        this.cancel.next();
    }
    
    public onSubmit(): void {
        if (this.form.valid) {
            const book = new Book().fromJSON(this.form.value);
            
            if (this.booksService.mode === BookMode.Edit) {
                this.booksService.updateBook(book).subscribe(
                    () => this.toastrService.success(`Книга ${book.title} сохранена успешно`),
                    () => this.toastrService.success(`Произошла ошибка при сохранении книги ${book.title}`)
                );
            } else {
                this.booksService.createBook(book).subscribe(
                    () => this.toastrService.success(`Книга ${book.title} создана успешно`),
                    () => this.toastrService.success(`Произошла ошибка при создании книги ${book.title}`)
                );
            }
        }
    }
    
    private initializeForm(): void {
        const edit: boolean | null = this.mode === BookMode.Edit || null;
        
        this.form = new FormGroup({
            title: new FormControl(edit && this.book.title, [Validators.required, Validators.maxLength(30)]),
            authors: new FormArray(this.getAuthorsGroups(edit ? this.book.authors : []), CustomValidators.minArrayLength(1)),
            pages: new FormControl(edit && this.book.pages, [Validators.required, Validators.min(1), Validators.max(10000)]),
            publisher: new FormControl(edit && this.book.publisher, Validators.maxLength(30)),
            publicationYear: new FormControl(edit && this.book.publicationYear, Validators.min(1800)),
            releaseDate: new FormControl(edit && this.book.releaseDate, Validators.required),
            isbn: new FormControl(edit && this.book.isbn, CustomValidators.isbn),
            image: new FormControl(edit && this.book.image)
        });
    }
    
    private getAuthorsGroups(authors: Author[]): FormGroup[] {
        return authors
            .map((author) => new FormGroup({
                name: new FormControl(author.name, [Validators.required, Validators.maxLength(20)]),
                lastname: new FormControl(author.lastname, [Validators.required, Validators.maxLength(20)])
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
