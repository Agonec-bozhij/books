import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
import {SortDirection} from "../../../common/models/enums/sort-direction";

@Component({
    selector: "bk-sort-indicator",
    template: `
        <span class="indicator" *ngIf="direction">
            <mat-icon [color]="direction === 'asc' ? 'warn' : 'primary'">arrow_right_alt</mat-icon>
            <mat-icon [color]="direction === 'desc' ? 'warn' : 'primary'">arrow_right_alt</mat-icon>
        </span>
    `,
    styleUrls: ["./sort-indicator.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SortIndicatorComponent {
    
    @Input() public direction: SortDirection | null = null;
}
