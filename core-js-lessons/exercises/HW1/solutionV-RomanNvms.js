// Dan's Solution:
function repeatLetter(letter,times) {
    for (var result = ''; times > 0; times--)
        result += letter;
    return result;
}

function romanizeMagnitude(units,onesDigit,fivesDigit,tensDigit) {
    units = Math.floor(units);
    if (units == 9 && tensDigit)
        return onesDigit + tensDigit;
    if (units == 4 && fivesDigit)
        return onesDigit + fivesDigit;
    if (units >= 5 && fivesDigit)
        return fivesDigit + repeatLetter(onesDigit,units-5);
    return repeatLetter(onesDigit,units);
}

function romanize(num) {
    var result = romanizeMagnitude(num/1000,'M','','');
    num %= 1000;
    result += romanizeMagnitude(num/100,'C','D','M');
    num %= 100;
    result += romanizeMagnitude(num/10,'X','L','C');
    num %= 10;
    result += romanizeMagnitude(num,'I','V','X');
    return result;
}



// Ben's Solution:
function toRomNum(num) {
    var arabics = [1,4,5,9,10,40,50,90,100,400,500,900,1000];
    var romNums = ['I','IV','V','IX','X','XL','L','XC','C','CD','D','CM','M']; //same indices
    var output = '';

    for (var i = arabics.length-1; i >= 0; i--) {
        while (num >= arabics[i]) {
            num -= arabics[i];
            output += romNums[i];
        }
    }

  return output;
};

// math page where I found the idea for this
//    http://rapidtables.com/convert/number/how-number-to-roman-numerals.htm
