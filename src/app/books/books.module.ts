import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {BooksRoutingModule} from "./books-routing.module";
import {BooksListComponent} from "./pages/books-list/books-list.component";

@NgModule({
    declarations: [
        BooksListComponent
    ],
    imports: [
        CommonModule,
        BooksRoutingModule
    ]
})
export class BooksModule {
}
