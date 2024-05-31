export type FileOrNull = File | null;

export class MovieRequest {
    title!: string;
    descriptions!: string;
    duration!: number;
    releasedate!: string;
    genre!: string;
    language!: string;
    performers!: string;
    director!: string;
    trailer!: string;
    status!: number;
    file!: FileOrNull;
}