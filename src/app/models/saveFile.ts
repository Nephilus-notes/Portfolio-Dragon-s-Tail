/**
 * A database object used for retrieving saved games.  Keys: id, userID, 
 * playerCharacterID, locationID, dateUpdated, dateAdded, characterName
 */

export interface SaveFile {
    id:number;
    userID: number;
    playerCharacterID: number;
    locationID: string;
    dateUpdated: string;
    dateAdded: string;
    characterName: string;
}