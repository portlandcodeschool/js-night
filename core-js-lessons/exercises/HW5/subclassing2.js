
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


OceanCoord.prototype.drift = function(maxLat,maxLong,maxDeep) {
    GlobalCoord.prototype.drift.call(this,maxLat,maxLong);
    this.depth += maxDeep*( 2*Math.random() - 1);
    if (this.depth<0) this.depth=0;
    return this;
};


OceanCoord.prototype.toString = function() {
    return GlobalCoord.prototype.toString.call(this) +
    ', '+ this.depth.toFixed(2) + ' fathoms deep';
}

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
    this.forage();
    if (!this.huntsAt)
	console.log(this.name + ' has nowhere to hunt :-(\n');
    else
	console.log(this.name + ' ' + this.motion + ' to ' + this.huntsAt);
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

// Examples:
var lion = new Animal('Lion');
lion.hunt();
lion.hunt();



var bird = new Animal('Bird');
bird.range = 5;
bird.motion = 'flies';
bird.hunt();
bird.hunt();


function Fish(name) {
    Animal.call(this,name);
}
Fish.prototype = new Animal('');
Fish.prototype.constructor = Fish;

Fish.prototype.range = 5;
Fish.prototype.motion = 'swims';

Fish.prototype.canLiveAt = function(coord) {
    return !coord.isLand();
}
Fish.prototype.canHuntAt = Animal.prototype.canLiveAt;

Fish.prototype.huntingCoordType = OceanCoord;
Fish.prototype.startingCoord = function() {
    var start = new OceanCoord(25,0);
    start.drift(65,180); //include randomness; 
    return start;
}

var tuna = new Fish('tuna');
tuna.hunt();
tuna.hunt();
