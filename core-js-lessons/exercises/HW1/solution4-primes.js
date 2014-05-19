function isInteger(n) {
	if (typeof n !== "number")
		return false;
	return (n%1 === 0);
	//OR:
	// return (n===Math.floor(n));
	//OR ES6-only function:
	// return Number.isInteger(n)
}

function isPrime(n) {
    if (n<2 || !isInteger(n))
        return false;    // excludes 0,1,and non-integers
    // search for number which divides n evenly...
    var sqrt=Math.sqrt(n); // only need to search up to n's square root
    for (var test=2; test<=sqrt; test++) {
        if (isInteger(n/test))
            return false;  //found one; n isn't prime
    }
    return true;//n must be prime
 }
 