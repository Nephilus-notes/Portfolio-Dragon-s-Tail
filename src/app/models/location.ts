export interface Location {
    id: string;
    name: string;
    enterText: string;
    middleText: string;
    exitText: string;
    moveOptions: Array<string>;
    commonNPC: string;
    uncommonNPC: string;
    rareNPC: string;
    secretNPC: string;
    next: string;
}