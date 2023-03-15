export interface Location {
    id: string;
    name: string;
    enterText: string;
    exitText: string;
    options: Array<string>;
    enemies: Array<object>;
}