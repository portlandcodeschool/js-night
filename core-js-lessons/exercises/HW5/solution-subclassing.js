function Animal() {}
Animal.prototype.move = function() { return 'walk'};

function Bird() {}
// Replace Bird's default prototype with a new Animal, which will inherit from Animal.prototype:
Bird.prototype = new Animal();
Bird.prototype.constructor = Bird;
// Now add Bird-specific behaviors
Bird.prototype.move = function() { return 'fly'};
Bird.prototype.hasWings = true;


function Fish() {}
// as with Bird...
Fish.prototype = new Animal();
Fish.prototype.constructor = Fish;
Fish.prototype.move = function() { return 'swim'};


function Penguin() {}
Penguin.prototype = new Bird();
Penguin.prototype.constructor = Penguin;
Penguin.prototype.move = Fish.prototype.move; // borrow Fish prototype method to 'swim'

// Testing:

new Animal().move();// 'walk'
new Fish().move();// 'swim'
new Bird().move();// 'fly'
var pengo = new Penguin();
pengo.move();  //'swim'
pengo.hasWings; //true;
pengo instanceof Bird; //true
pengo instanceof Animal; //true

