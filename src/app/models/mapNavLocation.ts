/**
 * An interface representing a visitable area.  Keys: id, name, enterText, middleText
 * exitText, moveOptions, commonNPC, uncommonNPC, rareNPC, secretNPC, and next
 */
export interface NavLocation {
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