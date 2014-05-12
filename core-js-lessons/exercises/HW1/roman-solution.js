
function repeatLetter(letter,times) {
    for (var result=''; times>0; times--)
        result+=letter;
    return result;
}

function romanizeMagnitude(units,onesDigit,fivesDigit,tensDigit) {
    units = Math.floor(units);
    if (units==9 && tensDigit)
        return onesDigit+tensDigit;
    if (units==4 && fivesDigit)
        return onesDigit+fivesDigit;
    if (units>=5 && fivesDigit)
        return fivesDigit+repeatLetter(onesDigit,units-5);
    return repeatLetter(onesDigit,units);
}

function romanize(num) {
    var result = romanizeMagnitude(num/1000,'M','','');
    num%=1000;
    result+=romanizeMagnitude(num/100,'C','D','M');
    num%=100;
    result+=romanizeMagnitude(num/10,'X','L','C');
    num%=10;
    result+=romanizeMagnitude(num,'I','V','X');
    return result;
}
