import { Location } from './location'

export const LOCATIONS: Location[] = [
    { id: "loc_T", name: "Town", enterText: "", exitText: "", options:[""], enemies: []},
    { id: "loc_BS", name: "Blacksmith's Shop", enterText: "", exitText: "", options:[""], enemies: []},
    { id: "loc_AS", name: "Alchemist's Shop", enterText: "", exitText: "", options:[""], enemies: []},
    { id: "loc_I", name: "Inn", enterText: "", exitText: "", options:[""], enemies: []},
    { id: "loc_UB_TH", name: "Thagrag's Hope", enterText: "Thagrag's Hope", exitText: "", options:["T", "C"], enemies: []},
    { id: "loc_UB_WD", name: "Web of Depths", enterText: "Web of Depths", exitText: "", options:["T", "C"], enemies: []},
    { id: "loc_UB_GG", name: "Graith's Grotto", enterText: "Graith's Grotto", exitText: "", options:["T", "C"], enemies: []},
    { id: "loc_UB_GQL", name: "Graith Queen's Lair", enterText: "", exitText: "", options:[""], enemies: []},
    { id: "loc_SF_KF", name: "Kratab's Folly", enterText: "", exitText: "", options:[""], enemies: []},
    { id: "loc_SF_DD", name: "Dripping Death", enterText: "", exitText: "", options:[""], enemies: []},
    { id: "loc_SF_PR", name: `{{character.name}}'s Respite`, enterText: "", exitText: "", options:[""], enemies: []},
    { id: "loc_SF_TTD", name: "Tail of the Dragon", enterText: "", exitText: "", options:[""], enemies: []},
    { id: "loc_SF_combat?", name: "Combat", enterText: "", exitText: "", options:[""], enemies: []}

]