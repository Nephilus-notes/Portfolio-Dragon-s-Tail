# Portfolio with Embedded Game Dragon's Tail

Placeholder Description


# Components
Primary Game Display
<ul>
<li><s>Display text pertaining to the location</s></li>
<li>Display options to indicate what valid input are</li>
<li>Take user input to initiate an api call to proceed to the next location</li>
MVP+
<li>Add exit text with a user controlled button to shut down the current location</li>
</ul>
Character Info display
<ul>
<li><s>Parse a character object to display attributes</s></li>
<li>Internal logic to calculate variable attributes</li>
<li>Ability to load the current character</li>
<li>Button to hide or expand character info</li>
</ul>
Item Display
<ul>
<li><s>Parse a character object to display carried and equipped items</s></li>
<li><s>Enable users to recieve more details about items they carry</s></li>
<li><s>Enable users to equip and use items they carry</s></li>
<li>Enable users to view details about items they have equipped</li>
<li>Enable users to unequip items</li>
<li>Button to hide or expand backpack info</li>
</ul>
Load Game Page
<ul>
<li>Allow users to start a new game</li>
<li>Allow users to view games associated with their account</li>
<li>Allow users to load games associated with their account</li>
<li>Allow users to delete games associated with their account</li>
<li></li>
 </ul>
Login View
<ul>
<li>Allow users to log into their account</li>
<li>Users should be able to log out of their account</li>
</ul>
User Creation View
<ul>
<li>Users can use a form to input information required for account creation</li>
</ul>
Password Update View
<ul>
<li>Users can update their account with a new password</li>
</ul>
Landing Page
<ul>
<li>short bio/mission statement</li>
<li>Link to Github page</li>
<li>Project Descriptions and links</li>
MVP+
<li>Make it nice</li>
</ul>
Nav Bar
<ul>
<li>link to load/start game (game entrypoint)</li>
<li><s>Link to landing page</s></li>
<li>link to log in page</li>
<li>conditional button for logout</li>
</ul>
Combat component
<ul>
<li>Display the enemy and certain attributes including hp</li>
<li>Display abilities the character has available</li>
<li>Take user input on what abilities are used</li>
<li>Use ability display to guide user in choosing an input</li>
<li>Display/generate text to tell the user what is happening</li>
<li>Maintain character info and character item display in some way</li>
MVP+
<li>Display detailed information on abilities</li>
</ul>

## Logic 
Combat

Abilities (if variable) should be pulled from the DB/validated at the start of combat
    Attack - calculates enemy dodge % and deals damage based on str
    Evade - boosts dodge by 10 for 2 turns (resulting in 10% evade boost)
    Defend - boosts armor by 2 for 2 turns
    Flee - if character has a higher dex results in combat ending, otherwise it adds a fleeing flag. if the flag is already raised the character escapes regardless.


Travel


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
