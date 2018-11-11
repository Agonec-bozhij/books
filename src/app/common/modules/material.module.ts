import {NgModule} from "@angular/core";
import {
    MatButtonModule,
    MatCardModule,
    MatIconModule,
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
        MatRippleModule
    ],
    exports: [
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatRippleModule
    ]
})
export class MaterialModule {
}
