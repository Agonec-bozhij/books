import {NgModule} from "@angular/core";
import {
    MatButtonModule,
    MatCardModule, MatFormFieldModule,
    MatIconModule, MatInputModule,
    MatListModule,
    MatRippleModule,
    MatSidenavModule,
    MatToolbarModule
} from "@angular/material";

@NgModule({
    imports: [
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule
    ],
    exports: [
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule
    ]
})
export class MaterialModule {
}
