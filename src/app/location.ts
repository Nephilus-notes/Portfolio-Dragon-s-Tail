export interface Location {
    id: string;
    name: string;
    enterText: string;
    exitText: string;
    options: object;
    enemies: Array<Int16Array>;
}