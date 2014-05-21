
function everyNth(array,n) {
    var result = [];
    for (var i=n-1; i<array.length; i+=n) {
      result.push(array[i]);
    }
    return result;
}
// Call:
everyNth([0,1,2,3,4,5], 3)//[2,5]


// method version:
var array = [/* some values here*/];
array.everyNth = function(n) {
    var result = [];
    for (var i=n-1; i<this.length; i+=n) {
      result.push(this[i]);
    }
    return result;
}
// Call:
array.everyNth(2);


// ---- Toolbox pattern ------
var toolkit = {
    method: function() {
    },

    anotherMethod: function() {
    }
}

// ---- Toolbox Example: Currency converter
var exchange = {
    rate: 1.37, //dollars per euro

    toDollars: function(euros) {
	return euros * this.rate;
    },

    toEuros: function(dollars) {
	return dollars / this.rate;
    },

    convert: function(string) {
	if (string[0]==='$')
	    return 'E'+this.toEuros(string.slice(1));
	if (string[0]==='E')
	    return '$'+this.toDollars(string.slice(1));
	return toDollars(string);
    }
};
//call:
exchange.convert('$20.00');


// Incremental form:
var exchange = {};
exchange.rate = 1.37;
exchange.toDollars = function(euros) {...}
exchange.toEuros = function(dollars) {...}
exchange.convert = function(string)  {...}


