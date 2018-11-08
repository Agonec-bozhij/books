import {jsonProperty, Serializable} from "ts-serializable";

export class Author extends Serializable {
    @jsonProperty(String)
    public name: string = "";
    
    @jsonProperty(String)
    public lastname: string = "";
}
