function copy(obj) {
    var copy = {};
    for (var key in obj) {
        copy[key]=obj[key];
    }
    return obj;
}

function equal(objA,objB) {
    var key;
    for (key in objA) {
        if (objA[key]!==objB[key])
            return false;
    }
    for (key in objB) {
        if (objB[key]!==objA[key])
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


function union(objA,objB) {
    var union= copy(objA);
    for (var key in objB) {
        union[key] = union[key] || objB[key];
    }
    return union;
}

function intersection(objA,objB) {
    var isect = {};
    for (var key in objA) {
        if (key in objB)
            isect[key] = objA[key] && objB[key];
    }
    return isect;
}

function difference(objA,objB) {
    var diff=copy(objA);
    for (var key in objB) {
        delete diff[key];
    }
    return diff;
}


// Testing
function assert(claim,warning) {
    if (!claim) console.log(warning);
}

// Your assertions will differ...
var testVar;
assert( equal( union( {a:0,b:0},{b:1,c:0} ),
                        {a:0,b:1,c:0} ),        "Union 1 failed");
assert( equal( union( {1:Infinity}, {1:NaN,2:NaN} ),
                        {1:Infinity,2:NaN} ),   "Union 2 failed");
assert( equal( union( {a:undefined}, {} ),
                        {a:undefined} ),        "Union 3 failed");
assert( equal( union( testVar={a:1}, {a:2,b:testVar} ),
                            {a:1,b:testVar} ),  "Union 4 failed");
assert( equal( union( {'1':1},{'2':2} ),
                        {1:1,2:2} ),            "Union 5 failed");

assert( equal( intersection ( {}, {} ),
                                {} ), "Intersection 1 failed");
assert( equal( intersection ( {}, {} ),
                                {} ), "Intersection 2 failed");
assert( equal( intersection ( {}, {} ),
                                {} ), "Intersection 3 failed");
assert( equal( intersection ( {}, {} ),
                                {} ), "Intersection 4 failed");
assert( equal( intersection ( testVar={}, {} ),
                                {} ), "Intersection 5 failed");
