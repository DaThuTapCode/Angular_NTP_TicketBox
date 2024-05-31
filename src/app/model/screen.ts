import { Theater } from "./theater";

export class Screen {
    id: number;
    theater: Theater;
    name: string;
    type: string;

    constructor(data:any){
        this.id = data.id;
        this.theater = new Theater(data.theater);
        this.name = data.name;
        this.type = data.type;
    }
}