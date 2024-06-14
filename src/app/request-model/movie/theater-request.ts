import { FileOrNull } from "./movie-request";

export class TheaterRequest{
    name!: string;
    location!: string;
    image!: string;
    phone!: string;
    email!: string;
    description!: string;
    file!: FileOrNull;
}