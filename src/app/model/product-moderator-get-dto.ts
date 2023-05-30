export class ProductModeratorGetDTO {

    id: number = 0;
    name: string = "";
    description: string = "";
    state: string | null = "SINREVISAR";
    reason: string | null = null;
    images: string[] = [];

    get isCompleted() {
        return this.state && this.state != "SINREVISAR";
    }

}
