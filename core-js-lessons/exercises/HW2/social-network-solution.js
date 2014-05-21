// Template

var people = {index:{}};

people.meet = function(nameA,nameB) {
}

people.haveMet = function(nameA,nameB) {
}

people.friendsOf = function(name) {
}

people.makeNewPerson(newName) {
    return {name:newName, friends:{}}
}
//people.morePropertiesAsNeeded = whatever;


// Solution, Part 1 (Moderate)
var people = {index:{}};

people.findPerson = function(name) {
    var person = this.index[name];
    if (!person) {
        person = (this.index[name] = {name:name, friends:{}});
    }
    return person;
}

people.meet = function(nameA,nameB) {
    var a = this.findPerson(nameA);
    var b = this.findPerson(nameB);
    if (a===b) return;
    
    if (!a.friends[nameB]) a.friends[nameB]=0;
    if (!b.friends[nameA]) b.friends[nameA]=0;
    a.friends[nameB]++;
    b.friends[nameA]++;
}

people.haveMet = function(nameA,nameB) {
    var a = this.findPerson(nameA);
    if (!a) return;
    return a.friends[nameB];
}

people.friendsOf = function(name) {
    var a = this.findPerson(name);
    if (!a) return;
    var friends=[];
    for (var otherName in a.friends) {
        friends.push(otherName);
    }
    // OR: var friends = Object.getOwnPropertyNames(a.friends);
    return friends.sort().join();
}
//=======

/*
// Solution, Part 2 (Moderate)

people.findPerson = function(name) {
    var person = this.index[name];
    if (!person) {
        person = (this.index[name] = {name:name, bff:'', bffMeetings:0, friends:{}});
    }
    return person;
}

people.updateBFF(person,otherName) {
    var meetings = person.friends[otherName];
    if (meetings>person.bffMeetings) {
        person.bff = otherName;
        person.bffMeetings = meetings;
    }
    return meetings;
}

people.meet = function(nameA,nameB) {
    var a = this.findPerson(nameA);
    var b = this.findPerson(nameB);
    if (a===b) return;
    
    if (!a.friends[nameB]) a.friends[nameB]=0;
    if (!b.friends[nameA]) b.friends[nameA]=0;
    a.friends[nameB]++;
    b.friends[nameA]++;

    var meetings = this.updateBFF(a,nameB);
    this.updateBFF(b,nameA);
    
    //if (meetings>3) {...}
    
}
*/

// Part3 (Difficult)
people.friendObjsOf = function(obj) {
    var friendObjs = [];
    for (var name in obj.friends) {
        friendObjs = this.index[name];
    }
    return friendObjs;
}

people.friendsOfFriendsOf = function(name) {
    var a = this.index[a];
    if (!a) return;
    var friendObjs = this.friendObjsOf(a);
    var set = a.friends;
    for (var i=0; i<friendObjs.length; i++) {
        set = union(set,friendObjs[i]);
    }
    return set;
}
    

//======== Testing:
people.meet("Al","Ben");
people.meet("Al","Clarissa");
people.meet("Ben","Dan");
people.meet("Dan","Clarissa");
people.meet("Ben","Clarissa");

people.haveMet("Clarissa","Al"); //1
people.friendsOf("Ben"); // "Al,Clarissa,Dan"

