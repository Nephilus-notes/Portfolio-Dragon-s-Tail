# Portfolio with Embedded Game Dragon's Tail

Hundreds of years ago, while magic was in its nascent stages, a goblin made a huge mistake: Graith'Gesh Trees.  Born of magic and betrayal, Graith'Gesh Trees were trees that could move as easily as an animal with one thought in their minds: killing any goblin they could.  This murderous intent drove the goblins underground, where they lived many years cut off from their brethren.  Now a young goblin is coming of age and doing what nobody else has: blazing a trail north out of the Dragon's Tail.

In this text-based RPG you strive to complete your Enlightening, a coming of age ritual every young goblin undertakes to prove their worth to the clan. You just happened to choose one much, much harder than anyone else.  By exploring quiet caves of the Underdark you can strengthen yourself to tackle the world above.  After years of living underground you must brave the bright lands of the shining forest, fending off wolves and worse, armed with whatever weapons you can acquire.

Using a combination of text input fields and buttons you explore the Dragon's Tail, buying weapons and items in town before heading out into the wilds once again.

Level up your stats to be able to take down more powerful creatures!

Soon you will be able to learn the powerful magicks that are your birthrite, fighting fire with fire as you take back what is yours from the magic-born Graith'Gesh Trees.


## Logic 
### Combat

Combat is a simple turn based affair, with the player choosing their action and both player and computer taking their turns based on who is faster.
Currently the player has 4 abilities(Attack, Evade, Defend, and Flee) but magic is coming and player's will be able to customize their approach to combat.

Abilities (if variable) should be pulled from the DB/validated at the start of combat
    <li>Attack - calculates enemy dodge % and deals damage based on str</li>
    <li>Evade - boosts dodge by 10 for 2 turns (resulting in 10% evade boost)</li>
    <li>Defend - boosts armor by 2 for 2 turns</li>
    <li>Flee - if character has a higher dex results in combat ending, otherwise it adds a fleeing flag. if the flag is already raised the character escapes regardless.</li>

Transfer:
pass character to combat display, let that component take care of all combat logic

### Travel
Traveling is handled by taking validated string inputs and using them to make APi calls to get information on a new location from the database to change the game states.

When traveling in the Shining Forest of the Underdark you start to learn the fastest ways through the area.  You will be able to speed quickly through, or spend more time fighting more creatures and getting to know the landscape by heart.  Character exploration variables are incremented behind the scenes.

When shopping the string input gives way to buttons, a simpler way to choose the item you want to know more about, buy it and add it to your inventory if you have enough resources, or leave.  

Will you discover strange and wonderful things that don't result in a creature trying to eat your face off? Time will tell....


## If you want to play:
You'll need:
 <li>A way to run an Angular file (VS code or your IDE of choice)</li>
 <li>A way to run a .NET project (VS Studio)</li>
 <li>And a Database (DBeaver for current PostgreSQL configuration)</li>

This project will be hosted once I get far enough in development but in the meantime...

### Clone the Repo
Clone the repo and type "ng serve --open" to open up a development server but wait...

### Spin up a backend
[Github for ASP.NET backend](https://github.com/Nephilus-notes/DTpureback)
Clone the repo above to download the backend API.  Currently configured with a Postgres database, if you're using Visual Studio all you have to do is put your Postgres password into your Secret Manager, Update the Database with the lastest Migration, and enjoy.




# Components
Primary Game Display
<ul>
<li><s>Display text pertaining to the location</s></li>
<li>Display options to indicate what valid input are</li>
<li><s>Take user input to initiate an api call to proceed to the next location</s></li>
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
<li><s>Allow users to load games</s></li>
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
<li><s>link to load/start game (game entrypoint)</s></li>
<li><s>Link to landing page</s></li>
<li>link to log in page</li>
<li>conditional button for logout</li>
</ul>
Combat component
<ul>
<li><s>Display the enemy and certain attributes including hp</s></li>
<li>Display abilities the character has available</li>
<li><s>Take user input on what abilities are used</s></li>
<li>Use ability display to guide user in choosing an input</li>
<li><s>Display/generate text to tell the user what is happening</s></li>
<li><s>Maintain character info and character item display in some way</s></li>
MVP+
<li>Display detailed information on abilities</li>
</ul>


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
