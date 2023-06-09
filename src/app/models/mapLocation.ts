import { NavLocation } from "./mapNavLocation";

/**
 * An interface representing a visitable area.  Keys: id, name, enterText, middleText
 * exitText, moveOptions, commonNPC, uncommonNPC, rareNPC, secretNPC, and next
 */
export interface Location {
    id: string;
    name: string;
    enterText: string;
    middleText: string;
    exitText: string;
    moveOptions: Array<NavLocation>;
    commonNPC: number;
    uncommonNPC: number;
    rareNPC: number;
    secretNPC: number;
    next: string;
}