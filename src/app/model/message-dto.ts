export class MessageDTO<T> {
    
    status: string = "";
    error: boolean = false;
    answer: T | null = null;

}
