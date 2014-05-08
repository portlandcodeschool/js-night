function repeatLetter(letter,times) {
    var result='';
    while (times>0) {
        result+=letter;
        times--;
    }
    return result;
}

function toRoman(num) {
    //assert((typeof num == "number"), "Num isn't a number!");
    //assert(num>0,"Num isn't positive!");
    var result = "";
    var thousands = Math.floor(num/1000);//M
    num%=1000;
    result+=repeatLetter('M',thousands);
    
    var fivehundreds = Math.floor(num/500);//D
    num%=500;
    var hundreds = Math.floor(num/100);//C
    num%=100;
    if (hundreds==4) {
      if (fivehundreds) result+="CM";
      else result+="CD";
    } else {
        if (fivehundreds) result+='D';
        result+=repeatLetter('C',hundreds);
    }
        
    var fifties = Math.floor(num/50);//L
    num%=50;
    var tens = Math.floor(num/10);//X
    num%=10;
    if (tens==4) {
       if (fifties) result+="XC";
       else result+="XL";
    } else {
        if (fifties) result+='L';
        result+=repeatLetter('X',tens);
    }
    
    var fives = Math.floor(num/5);//V
    num%=5;
    var ones = num;
    if (ones==4) {
      if (fives) result+="IX";
      else result+="IV";
    } else {
        if (fives) result+='V';
        result+=repeatLetter('I',ones);
    }
    return result;
}

function toRoman(num) {
    var result='';
    
    function enumerateTier(unitSize,onesDigit) {
        var units = Math.floor(num/unitSize);
        num%=unitSize;
        result+=repeatLetter(onesDigit,units);
    }
    function encodeTier(unitSize,onesDigit,fivesDigit,tensDigit) {
        var fiveSize = 5*unitSize;
        var atLeastFive = (num>=fiveSize);
        num%=fiveSize;
        var units = Math.floor(num/unitSize);
        num%=unitSize;
        if (units==4) {
            result+=onesDigit+(atLeastFive? tensDigit: fivesDigit);
        } else {
            if (atLeastFive) result+=fivesDigit;
            result+=repeatLetter(onesDigit,units);
        }
    }
    enumerateTier(1000,'M');
    encodeTier(100,'C','D','M');
    encodeTier(10,'X','L','C');
    encodeTier(1,'I','V','X');
    return result;
}

toRoman(1999);