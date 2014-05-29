// Part a)
function copy(obj) {
    var clone = {};
    for (var key in obj) {
        clone[key]=obj[key];
    }
    return clone;
}

function equal(objA,objB) {
    var key;
    for (key in objA) {
        if (objA[key] !== objB[key]) //Note: NaN will never match!
            return false;
    }
    for (key in objB) {
        if (objB[key] !== objA[key])
            return false;
    }
    return true;
}

function similar(objA,objB) {
    var key;
    for (key in objA) {
        if (!(key in objB))
            return false;
    }
    for (key in objB) {
        if (!(key in objA))
            return false;
    }
    return true;
}

// Part b)
function union(objA,objB) {
    var union = copy(objA);
    for (var key in objB) {
        union[key] = (union[key] || objB[key]);
    }
    return union;
}

function intersection(objA,objB) {
    var isect = {};
    for (var key in objA) {
        if (key in objB)
            isect[key] = (objA[key] && objB[key]);
    }
    return isect;
}

function difference(objA,objB) {
    var diff = copy(objA);
    for (var key in objB) {
        delete diff[key];
    }
    return diff;
}

// Part c)
function assert(claim,warning) {
    if (!claim) console.log(warning);
}

// Your assertions will differ, but your implementation should still pass these tests:
var testVar;
assert( equal( union( {a:0,b:0},{b:1,c:0} ),
                        {a:0,b:1,c:0} ),        "Union 1 failed");
assert( equal( union( {1:Infinity}, {1:NaN,2:0} ),
                        {1:Infinity,2:0} ),     "Union 2 failed");
assert( equal( union( {a:undefined}, {} ),
                        {a:undefined} ),        "Union 3 failed");
assert( equal( union( testVar={a:1}, {a:2,b:testVar} ),
                            {a:1,b:testVar} ),  "Union 4 failed");
assert( equal( union( {'1':1},{'2':2} ),
                        {1:1,2:2} ),            "Union 5 failed");

assert( equal( intersection ( {a:0,b:0}, {b:1,c:0} ),
                                {b:0} ),        "Intersection 1 failed");
assert( equal( intersection ( {a:1}, {b:1} ),
                                {} ),           "Intersection 2 failed");
assert( equal( intersection ( {}, {a:1,b:1,c:1,d:1,e:1,f:1} ),
                                {} ),           "Intersection 3 failed");
assert( equal( intersection ( {a:1}, {a:0} ),
                                {a:0} ),        "Intersection 4 failed");
assert( equal( intersection ( {obj:testVar={}}, {obj:testVar} ),
                                {obj:testVar} ),"Intersection 5 failed");

assert( equal( difference ( {a:0,b:0}, {b:1,c:0} ),
                            {a:0} ),        'Difference 1 failed');
assert( equal( difference ( {b:1,c:0}, {a:0,b:0} ),
                            {c:0} ),        'Difference 2 failed');
assert( equal( difference ( {a:1}, {a:0} ),
                            {} ),           'Difference 3 failed');
assert( equal( difference ( {a:1,b:2,c:3}, {d:0,e:0} ),
                            {a:1,b:2,c:3} ),'Difference 4 failed');
assert( equal( difference ( {obj:testVar={}}, {anything:0} ),
                            {obj:testVar} ),'Difference 5 failed');

// Part d)
/*
Because the || and && operators work left-to-right, they're not symmetric:
(x || y) may not equal (y || x).  For example: (1 || 2) is 1, but (2 || 1) is 2.
Therefore objects created by union or intersection may have different values
for their merged properties depending on the order of the merging sets.
For example: union({a:1},{a:2}) is {a:1}, but union({a:2},{a:1}) is {a:2}.
Those sets are similar (same keys) but not equal (different values).
*/

