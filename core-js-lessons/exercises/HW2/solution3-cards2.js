// Error-detecting version

var cardReader = {

    isValid: function(num,low,high) { // Returns--> NaN, true
        if ((typeof num)!="number") //wrong type
            return NaN;
        if (!Number.isInteger(num)) //non-integer
            return NaN;
        if (num<low || num>high) //out of range
            return NaN;
        return true;
    },

    rank: function(card) { // --> 1..13, NaN
        return this.isValid(card,0,51) &&
            Math.floor(card/4)+1;
    },

    suit: function(card) { // --> 1..4, NaN
        return this.isValid(card,0,51) &&
            (card%4)+1;
    },

    cardID: function(rank,suit) { // --> 0..51, NaN
        return this.isValid(rank,1,13) &&
                this.isValid(suit,1,4) &&
                ((rank-1)*4 + (suit-1));
    },
    
    color: function(card) { // -->"red,"black",NaN
        var suit=this.suit(card);
        if (isNaN(suit))
            return NaN;
        return (suit<3)? "red": "black";
    },

    rankNames: ['','Ace','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten',
                'Jack','Queen','King'],
    suitNames: ['','Hearts','Diamonds','Spades','Clubs'],

    name: function(card) { //--> string, NaN
        var rank = this.rank(card);
        var suit = this.suit(card);
        return rank && suit && (this.rankNames[rank]+' of '+this.suitNames[suit]);
    },

    precedes: function(cardA,cardB) { //-->false,true,NaN
        var diff= this.rank(cardB)-this.rank(cardA);
        if (isNaN(diff))
            return NaN;
        return diff==1 || diff==-12;
    },
    
    sameColor: function(cardA,cardB) { //-->false,true,NaN
        var colorA=this.color(cardA), colorB=this.color(cardB);
        if (Number.isNaN(colorA) || Number.isNaN(colorB))
        // must use Number.isNaN() instead of isNaN(), which returns true for non-numeric strings
            return NaN;
        return colorA==colorB;
    },
    
    nextInSuit: function(cardA) {//--> 0..51,NaN
        nextCard = this.isValid(cardA,0,51) && cardA+4;
        if (nextCard>51) nextCard-=52;
        return nextCard;
    },
    
    prevInSuit: function(cardB) {//--> 0..51,NaN
        prevCard = this.isValid(cardB,0,51) && cardB-4;
        if (prevCard<0) prevCard+=52;
        return prevCard;
    }
};