import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "./common/components/home/home.component";
import {BooksModule} from "./books/books.module";

const routes: Routes = [
    {path: "home", component: HomeComponent, pathMatch: "full"},
    {path: "list", loadChildren: "./books/books.module#BooksModule"},
    {path: "**", redirectTo: "/home"}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
