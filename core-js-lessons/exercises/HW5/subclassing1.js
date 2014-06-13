//var worldMap = {};

// Simple constructor:
function GlobalCoord(latd,longtd) {
    this.latitude = latd;
    this.longitude = longtd;
}

// Force 0 for non-numeric inputs:
function GlobalCoord(latd,longtd) {
    this.latitude = isNaN(latd)? 0 : latd;
    this.longitude = isNaN(longtd)? 0 : longtd;
}

// Improve to copying constructor:
function GlobalCoord(arg0,arg1) {
    if (arg0 instanceof GlobalCoord) {
	this.latitude = arg0.latitude;
	this.longitude = arg0.longitude;
    } else {
	this.latitude = isNaN(arg0)? 0: arg0;
	this.longitude = isNaN(arg1)? 0: arg1;
    }
}

GlobalCoord.prototype.drift = function(maxLat,maxLong) {
    if (isNaN(maxLong))
	maxLong = maxLat; //allow single parameter for both
    this.latitude += maxLat * (2*Math.random() - 1);
    this.longitude+= maxLong* (2*Math.random() - 1);
}


/*
function GlobalCoord(latd,longtd) {
    if (isNaN(latd))
	latd = 90*(2*Math.random()-1);   // -90...90 degrees

    if (isNaN(longtd))
	longtd = 180*(2*Math.random()-1);//-180...180 degrees

    this.latitude = latd; 
    this.longitude = longtd;
}

GlobalCoord.prototype.copyFrom  = function(coord) {
    if (coord instanceof GlobalCoord) {
	this.latitude = coord.latitude;
	this.longitude = coord.longitude;
	return this;
    } else return null;
}

GlobalCoord.prototype.drift = function(maxrange) {
    this.latitude  += maxrange*( 2*Math.random() - 1);
    this.longitude += maxrange*( 2*Math.random() - 1);
    return this;
}
*/

GlobalCoord.prototype.isLand = function() {
    //potentially complex calculation here, but for now:
    //presume one continent, the spatial union of:
    //  antarctic disk below latitude -60, and
    //  pole-to-pole strip with longitude between -30...30
    return (this.latitude < -70) ||
        (Math.abs(this.longitude) < 30);
}


GlobalCoord.prototype.toString = function() {
    function format(val,pos,neg) {
	return Math.abs(val.toFixed(2))+'\u00B0'+(val>=0? pos: neg);
    }
    return format(this.latitude,'N','S')
        + ', '
        + format(this.longitude,'E','W');
}
//-------------

/*
// 'Has-a...' version:
function OceanCoord(latd,longtd,depth) {
    this.surface = new GlobalCoord(latd,longtd);
    if (isNaN(depth))
	depth = 1000*Math.random(); //0..1000 fathoms

    this.depth = depth;
}

OceanCoord.prototype.copyFrom = function(coord) {
    if (!this.surface.copyFrom(coord))
	return null;
    if (coord instanceof OceanCoord)
	this.depth = coord.depth;
    return this;
}

OceanCoord.prototype.drift = function(horizRange,vertRange) {
    this.surface.drift(horizRange);
    this.depth += vertRange*( 2*Math.random() - 1);
    if (this.depth<0) this.depth=0;
    return this;
};

OceanCoord.prototype.toString = function() {
    return this.surface + ', ' + this.depth.toFixed(2) + ' fathoms deep';
}
*/
//-----------------------
// 'Is-a...' version:
function OceanCoord(arg0,arg1,depth) {
    GlobalCoord.call(this,arg0,arg0); // Use superclass ctor as intializer
    if (arg0 instanceof OceanCoord) {
	this.depth = arg0.depth;
    } else {
	this.depth = (isNaN(depth)? 0: depth);
    }
    if (isNaN(depth))
	depth = 1000*Math.random(); //0..1000 fathoms

    this.depth = depth;
}


//  subclassing:
OceanCoord.prototype = new GlobalCoord(0,0);
OceanCoord.prototype.constructor = OceanCoord;

/*
OceanCoord.prototype.copyFrom = function(coord) {
    if (!GlobalCoord.prototype.copyFrom.call(this,coord))
	return null;
    if (coord instanceof OceanCoord)
	this.depth = coord.depth;
    return this;
}
*/

OceanCoord.prototype.drift = function(maxLat,maxLong,maxDeep) {
    GlobalCoord.prototype.drift.call(this,maxLat,maxLong);
    this.depth += maxDeep*( 2*Math.random() - 1);
    if (this.depth<0) this.depth=0;
    return this;
};

/*
OceanCoord.prototype.toString = function() {
    return GlobalCoord.prototype.toString.call(this) +
    ', '+ this.depth.toFixed(2) + ' fathoms deep';
}
*/

//----
    
// Basic animal: lives and hunts on land
function Animal(name) {
    this.name = name;
    this.livesAt = this.migrate();
    this.huntsAt = this.forage();
}

Animal.prototype.range = 1;
Animal.prototype.motion = 'runs';

Animal.prototype.canLiveAt = function(coord) {
    return coord.isLand();
}
Animal.prototype.canHuntAt = Animal.prototype.canLiveAt;

Animal.prototype.huntingCoordType = GlobalCoord;
//Animal.prototype.homeCoordType = GlobalCoord;

Animal.prototype.hunt = function() {
    if (!this.huntsAt)
	console.log(this.name + ' has nowhere to hunt :-(\n');
    else
	console.log(this.name + this.motion + ' to ' + this.huntsAt);
}

Animal.prototype.startingCoord = function() {
    var start = new GlobalCoord(0,0);
    start.drift(90,180); //include randomness; 
    //in this default case, distribute globally
    return start;
}

Animal.prototype.migrate = function () {
    // find a suitable place to live
    for (var home, i=0; i<10; i++) {
	home = this.startingCoord();
	if (this.canLiveAt(home)) {
	    this.livesAt = home;
	    return home;
	}
    }
    return null; //no luck;
}

Animal.prototype.forage = function() {
    // find a suitable place to hunt
    var home = this.livesAt;
    if (!home) return null;
    // try up to 10 times:
    for (var tryPlace, i=0; i<10; i++) {
	tryPlace = new this.huntingCoordType(home); //reset to home location...
	tryPlace.drift(this.range);// ... then move randomly
	if (this.canHuntAt(tryPlace)) {
	    this.huntsAt = tryPlace;
	    return tryPlace;
	}
    }
    return null;// no luck
}

// Example:
var lion = new Animal('Lion');
lion.hunt();

/*
Animal.prototype.migrate = function() {
	// find a suitable place to live
    var CoordCtor = this.livesAt.constructor;
    var coord = new CoordCtor();
    while (!this.canLiveAt(coord)) {
	coord = new CoordCtor();
    }
    this.location = coord;
    console.log(this.name +' '+ this.motionWord +' to '+ coord);
}
*/

// Homework:

/*
function Fish(name) {
    Animal.call(this,name);
    this.location = new OceanCoord();
}
Fish.prototype = new Animal();
Fish.prototype.constructor = Fish;

Fish.prototype.motionWord = 'swims';
Fish.canGoTo = function(place) {
    return (!place.isLand);
}


// ---

    var kraken = new SeaAnimal('kraken');
//kraken something something...
kraken.migrate();//-->"kraken glides to 42*S, 28*W
*/


/*

** Problem 4)  Imaginary Menagerie**

In the attached template file is the definition of a class Animal, which makes use of the GlobalCoord class we saw in class.

**a) Make two instances of Animal, named 'lion' and 'bird' with these behaviors:
* Lions 'prowl', living and hunting on land, staying between latitudes of -30 and 30.
* Birds 'fly', staying between latitudes of -80 and 80, with a hunting range of 5 degrees.

You'll need to set some instance properties to override the inherited ones.


**b)** Change birds from an instance of Animal to a subclass (i.e. make a constructor Bird whose prototype inherits from Animal.prototype).  Make your bird-specific behaviors properties of Bird.prototype instead of the bird instance.


**c)**
Write a class (i.e. a constructor and sidekick prototype) SeaAnimal
which, like Bird, is a subclass of Animal but which represents creatures which live and hunt in the ocean.  You'll need to use the OceanCoord class (which includes depth) in place of GlobalCoord.
Leave unchanged all the properties of Animal.prototype and inherit from them, but in some cases SeaAnimal.prototype will need to override the inherited properties with different definitions.


**d)**
Using as many subclasses as you want, implement instances for each of these animals:

* Polar bears 'roam', staying north of latitude 70, living on land, hunting on land or sea down to 0 fathoms (cannot dive).

* Sea birds 'fly', live on land, and hunt at sea within 5 degrees down to 0 fathoms (cannot dive).

* Seals 'swim', live on land, and hunt at sea down to 20 fathoms.

* A fish 'swims' and stays above 100 fathoms.

* The Kraken 'lurks' at sea, living below 100 fathoms but hunting up to sea level.

* A penguin 'waddles' and stays south of -65 degrees; it lives on land but hunts at sea, down to a depth of 10 fathoms

* A dolphin 'frolics' and stays above 10 fathoms, between latitudes of -45 and 45.


Not every creature needs to be a class with its own constructor; some or all may be instances of a broader class.
Use your own judgement and do whatever seems easiest.

*/