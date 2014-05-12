// Ad hoc (simple) pattern
var thing = {};
thing.prop1 = ...
thing.prop2 = ...



// Toolbox pattern:
var toolbox = {};
toolbox.service1 = function() {...}
toolbox.service2 = function() {...}


// Open Factory Pattern
function makePart(...) {
    var part={};
    part.prop = ...
    return part;
}

function makeWhole(...) {
    var whole={};
    whole.part = makePart();
    ...
    return whole;
}
var thing = makeWhole(...);


// Closed Factory pattern:
function makeWhole(...) {
    var privateData;

    function makeCustomPart() {
        var part;
        ...
        return part;
    }
    
    var whole={};
    whole.part = makeCustomPart();
    ...
    return whole;
}
var thing = makeWhole(...);

// After week 4, Ctor patterns will replace Factory patterns:
// Open Constructor pattern:
function PartCtor(...) {
    this.prop = ...
}

function WholeCtor(...) {
    this.part = new PartCtor(...);
    ...
}
var thing = new WholeCtor(...);


// Closed Constructor pattern:
function WholeCtor(...) {
    function CustomPartCtor(...) {
        this.prop=...
    }
    
    this.part = new CustomPartCtor(...);
}
var thing = new WholeCtor(...);

// Module pattern:
var module = (function() {
    var privateData;
    function privateFunction() {...}
    
    var exportObj = {};
    exportObj.service1 = function {...}
    exportObj.service2 = function {...}
    ...
    return exportObj;
    
})();

// Module Extension pattern:
var fancyModule = (function(basicModule) {
    var privateFancyData;
    
    basicModule.fancyService1 = function {...}
    basicModule.fancyService2 = function {...}
    ...
    return basicModule;
    
})(basicModule);


