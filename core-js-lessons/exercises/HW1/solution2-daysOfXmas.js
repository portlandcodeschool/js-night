
var ordinals = ['first','second','third','fourth','fifth','sixth',
            'seventh','eighth','ninth','tenth','eleventh','twelfth'];

var items = ["a partridge in a pear tree.",
            "two turtle doves,",
            "three french hens,",
            "four calling birds,",
            "five... gold... rings,",
            "six geese-a-laying,",
            "seven swans-a-swimming,",
            "eight maids-a-milking,",
            "nine ladies dancing,",
            "ten lords-a-leaping,",
            "eleven pipers piping,",
            "twelve drummers drumming,"]

function generateDay(n) {
    var line = "On the "
            +ordinals[n-1]
            +" day of Xmas, my true love gave to me\n";
    for (var i=n; i; i--) {
        if (i==1 && n>1) {
            line += "and ";
        }
        line += items[i-1] + '\n';
    }
    return line;
}

function generateSong() {
    var song="";
    for (var day=1; day <= 12; day++) {
        song += generateDay(day)+'\n';
    }
    return song;
}

console.log(generateSong());
