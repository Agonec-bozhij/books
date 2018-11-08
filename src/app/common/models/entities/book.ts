import {jsonProperty, Serializable} from "ts-serializable";
import {Author} from "./author";

export class Book extends Serializable {
    @jsonProperty(String)
    public title: string = "";
    
    @jsonProperty([Author])
    public authors: Author[] = [];
    
    @jsonProperty(Number)
    public pages: number = 0;
    
    @jsonProperty(String)
    public publisher: string = "";
    
    @jsonProperty(Number)
    public publicationYear: number = 0;
    
    @jsonProperty(Date)
    public releaseDate: Date = new Date();
    
    @jsonProperty(String)
    public isbn: string = "";
    
    @jsonProperty(String)
    public image: string = "";
}
