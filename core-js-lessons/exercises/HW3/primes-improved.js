function isPrime(n) {
    var result = isPrime[n];
    if (result!==undefined) return result;
    
    var sqrt = Math.sqrt(n);
    for (var test = 2; test<=sqrt; test++) {
	if (n%test === 0)
	    return (isPrime[n]=false);
    }
    return (isPrime[n] = true);
}
isPrime[0]=false;
isPrime[1]=false;
isPrime[2]=true;

// Version 2

function isPrime(n) {
    var result = isPrime[n];
    if (result!==undefined) return result;
    
    var sqrt = Math.sqrt(n);
    for (var test = 2; test<=sqrt; test++) {
	if (n%test === 0)
	    return (isPrime[n]=false);
    }
    return (isPrime[n] = true);
}
isPrime[0]=false;
isPrime[1]=false;
isPrime[2]=true;
isPrime.nextUnknown = 3;
