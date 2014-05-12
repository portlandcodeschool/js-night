function isPrime(n) {
    if (n<2 || !Number.isInteger(n))
        return false;    // excludes 0,1,and non-integers
    // search for number which divides n evenly...
    var sqrt=Math.sqrt(n); // only need to search up to n's square root
    for (var test=2; test<=sqrt; test++) {
        if (Number.isInteger(n/test))
            return false;  //found one; n isn't prime
    }
    return true;//n must be prime
 }
 