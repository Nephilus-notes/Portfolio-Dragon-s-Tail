/**
 * DB object for actions taken in combat by PCs and NPCs alike.  keys: id, name, effect, description, affectedAttribute, modifier, duration, type.
 * 
 * Options for effect: "damage", "healing", "buff", "debuff".
 * 
 * Options for type : "physical", "magical".
 */
export interface Ability {
    id:number;
    name: string;
    effect: string;
    description:string;
    affectedAttribute: string;
    modifier: number;
    duration: number;
    type: string|null;
    cost: number;
    level: number;
    descendants: Array<Ability>;
}