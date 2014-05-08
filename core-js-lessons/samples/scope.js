// See diagram "Scope"
var x=y='a';
console.log(x);
function B() {
    var y='b';
    console.log(x+y);
    function C() {
        var x = z='c';
        console.log(x+y+z+C.caller);
    }
    C();
    return C;
}
var C=B();
C();



//======
/*
function outer() {
    console.log("outer can't see x:"+x);
  }

function wrapper() {
    var x=1;
    function inner() {
        console.log("inner sees x:"+x);
    }
    inner();
    outer();

    return inner;
}

var inner = wrapper();
inner();
*/
//======================
function makeOuter() {
    var x = 2;
    return function() {return x;}
}

function wrapper() {
    var x = 1;
    var outer = makeOuter();
    console.log(outer());
}

wrapper();
