export interface Location {
    id: string;
    name: string;
    enterText: string;
    middleText: string;
    exitText: string;
    moveOptions: Array<string>;
    commonNPC: number;
    uncommonNPC: number;
    rareNPC: number;
    secretNPC: number;
    next: string;
}