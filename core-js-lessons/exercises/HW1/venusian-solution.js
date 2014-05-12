function repeatLetter(letter,times) {
    for (var result=''; times>0; times--)
        result+=letter;
    return result;
}

function venusianizeMagnitude(units,one,two,three,six,nine) {
    units = Math.floor(units);
    if (units==8 && nine)
        return one+nine;
    if (units==5 && six)
        return one+six;
    if (units==2 && two)
        return two;
    if (units==2 && three)
        return one+three;
    if (units>=6 && six)
        return six+repeatLetter(one,units-6);
    if (units>=3 && three)
        return three+repeatLetter(one,units-3);
    return repeatLetter(one,units);
}


function venusianize(num) {
    var result = '';
    result+=venusianizeMagnitude(num/27,'O','','','');
    num%=27;
    result+=venusianizeMagnitude(num/9,'o','8','O','');
    num%=9;
    result+=venusianizeMagnitude(num,'|','','.',':','o');
    return result;
}

for (var i=1; i<81; i++) {
  console.log(venusianize(i));
  }