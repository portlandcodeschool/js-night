function outer1() {
    function nestedFn() {
        console.log("nested this=="+this);
    }
    nestedFn();
}
outer1(); outer1(); outer1();


function outer2() {
  outer2.memberFn();
}
outer2.memberFn=function() {
  console.log("member this=="+this);
}
outer2(); outer2(); outer2();

function outer3() {
    var obj = {delegatedFn:function() {
                console.log("delegated this=="+this);
                }};
    obj.delegatedFn();
}
outer3(); outer3(); outer3();


//--- Global functions ---
function wash(it) {
    delete it.dirt;
}
function paint(it,newcolor) {
    wash(it);
    it.color = newcolor;
}
var obj = {dirt:'yuck'};
paint(obj,'red');


// --- Toolbox functions
var toolbox = {};
toolbox.wash = function(it) {
    delete it.dirt;
}
toolbox.paint = function(it,newcolor) {
    this.wash(it);
    it.color = newcolor;
}
var obj = {dirt:'yuck'};
toolbox.paint(obj,'red');


// --- Factory
function factory() {
    var it = { wash: factory.wash,
                paint: factory.paint };
    it.dirt = 'yuck'
    return it;
}
factory.wash = function() {
    delete this.dirt;
}
factory.paint = function(newcolor) {
    this.wash();
    this.color = newcolor;
}
var obj = factory();
obj.paint('red');

// -- Helper nested inside method
function paint(newcolor) {
    function wash (it) {
        delete it.dirt;
    }
    wash(this);
    this.color = newcolor;
}
paint.call(obj,'red');

// Helper attached as submethod
function paint(newcolor) {
    paint.wash(this);
    this.color = newcolor;
}
paint.wash = function(it) {
    delete it.dirt
}
paint.call(obj,'red');

