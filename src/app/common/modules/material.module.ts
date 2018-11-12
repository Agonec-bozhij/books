import {NgModule} from "@angular/core";
import {
    MAT_DATE_LOCALE,
    MatButtonModule,
    MatCardModule, MatDatepickerModule, MatFormFieldModule,
    MatIconModule, MatInputModule,
    MatListModule, MatNativeDateModule,
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
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule
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
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    providers: [
        {provide: MAT_DATE_LOCALE, useValue: "ru-RU"}
    ]
})
export class MaterialModule {
}
