import {SortDirection} from "../enums/sort-direction";
import {jsonProperty, Serializable} from "ts-serializable";

export class SortState extends Serializable {
    @jsonProperty(String, null)
    public direction: SortDirection | null;
    
    @jsonProperty(String, null)
    public field: string | null;
    
    constructor(direction: SortDirection | null = null, field: string | null = null) {
        super();
        this.direction = direction;
        this.field = field;
    }
}
