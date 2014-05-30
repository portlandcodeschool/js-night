// Assert verifies various conditions within functions
// Calls to assert are optional but good practice
function assert(claim,warning) {
    if (!claim) console.log(warning);
}

// Solution:
var people = {index:{}};

people.findPerson = function(name) {
    assert(typeof name === 'string','ensurePerson:name should be string');
    return this.index[name];    
}

people.ensurePerson = function(name) {
    // return existing person, or else create them
    return this.findPerson(name) ||
        ( this.index[name] = {name:name, friends:{}} ); //if not found, make person
}

people.meet = function(nameA,nameB) {
    if (nameA===nameB) return; //don't meet oneself

    // retrieve or make the person objects:
    var a = this.ensurePerson(nameA);
    var b = this.ensurePerson(nameB);

    assert(typeof a === 'object','meet:a should be object');
    assert(typeof b === 'object','meet:b should be object');
    assert(a !== b,'meet:a,b should be different');

    // include each in other's friends list:
    if (!a.friends[nameB]) //if undefined...
            a.friends[nameB]=0;
    if (!b.friends[nameA])
            b.friends[nameA]=0;

    assert(a.friends[nameB] === b.friends[nameA], "meet: counts disagree"); //make sure their counts agree

    //increment meeting count of each, and return incremented count:
    ++a.friends[nameB];
    return ++b.friends[nameA];
}

people.haveMet = function(nameA,nameB) {
    var a = this.findPerson(nameA);
    return a && //maybe undefined
        a.friends[nameB];
}

people.friendsOf = function(name) {
    var person = this.findPerson(name);
    if (!person) return;
    var friends = Object.keys(person.friends);
    // OR: var friends = Object.getOwnPropertyNames(person.friends);
    // OR:
    //var friends=[];
    //for (var eachName in person.friends) {
    //    friends.push(eachName);
    //}
    return friends.sort().join();
}


people.friendsOfFriendsOf = function(name) {
    var person = this.findPerson(name);
    if (!person) return;

    var setOfNames = copy(person.friends); //duplicate set of names of friends (will be modified)
    for (var eachName in person.friends) {// for each friend of person...
        unionWith(setOfNames,this.findPerson(eachName).friends); //union the current set with set of that friend's friends
    }

    var arrOfNames = Object.keys(setOfNames);  //turn set into array
    return arrOfNames.sort().join();
}

// Copy from Problem #2:
function copy(obj) {
    var clone = {};
    for (var key in obj) {
        clone[key]=obj[key];
    }
    return clone;
}

// More efficient Union, adapted from Problem #2:
function unionWith(union,objB) { //modifies union obj; make sure it's a copy!
    for (var key in objB) {
        union[key] = union[key] || objB[key];
    }
}

//======== Testing:
assert(people.meet("Al","Al") === undefined,    'Test 1 failed');
assert(people.meet("Al","Ben") === 1,           'Test 2 failed');
assert(people.meet("Al","Clarissa") === 1,      'Test 3 failed');
assert(people.meet("Ben","Dan") === 1,          'Test 4 failed');
assert(people.meet("Dan","Clarissa") === 1,     'Test 5 failed');
assert(people.meet("Ben","Clarissa") === 1,     'Test 6 failed');
assert(people.meet("Al","Cris") === 1,          'Test 7 failed');
assert(people.meet("Dan","Ben") === 2,          'Test 8 failed');
assert(people.meet("Cris","Shawna") === 1,      'Test 9 failed');

assert(people.haveMet("Clarissa","Al") === 1,   'Test 10 failed');
assert(people.haveMet("Barack","Dan") === undefined,    'Test 11 failed');
assert(!people.haveMet("Ben","Shawna"),                 'Test 12 failed');//0 or undef OK
assert(people.friendsOf("Ben") === "Al,Clarissa,Dan",   'Test 13 failed');

assert(people.friendsOfFriendsOf("Ben")  === "Al,Ben,Clarissa,Cris,Dan",    'Test 14 failed');
assert(people.friendsOfFriendsOf("Cris") === "Al,Ben,Clarissa,Cris,Shawna", 'Test 15 failed');
