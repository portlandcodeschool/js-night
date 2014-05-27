// Error-detecting version

function makeCard(id) {
    return {id:id,
            rank : makeCard.rank,
            suit : makeCard.suit,
            color: makeCard.color,
            name : makeCard.cardName,
            precedes :  makeCard.precedes,
            sameColor:  makeCard.sameColor,
            nextInSuit: makeCard.nextInSuit,
            prevInSuit: makeCard.nextInSuit
        };
};

makeCard.isValid = function(num,low,high) { // Returns--> NaN, true
        if ((typeof num)!="number") //wrong type
            return NaN;
        if (!Number.isInteger(num)) //non-integer
            return NaN;
        if (num<low || num>high) //out of range
            return NaN;
        return true;
    };

makeCard.rank = function() { // --> 1..13, NaN
        var card = this.id;
        return makeCard.isValid(card,0,51) &&
            Math.floor(card/4)+1;
    };

makeCard.suit = function() { // --> 1..4, NaN
        card = this.id;
        return makeCard.isValid(card,0,51) &&
            (card%4)+1;
    };

/*
    cardID: function(rank,suit) { // --> 0..51, NaN
        return this.isValid(rank,1,13) &&
                this.isValid(suit,1,4) &&
                ((rank-1)*4 + (suit-1));
    },
*/    
makeCard.color = function() { // -->"red,"black",NaN
        var suit=this.suit();
        if (isNaN(suit))
            return NaN;
        return (suit<3)? "red": "black";
    };

makeCard.rankNames = ['','Ace','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten',
                        'Jack','Queen','King'];

makeCard.suitNames = ['','Hearts','Diamonds','Spades','Clubs'];

makeCard.cardName = function() { //--> string, NaN
        var rank = this.rank();
        var suit = this.suit();
        return rank && suit && (makeCard.rankNames[rank]+' of '+makeCard.suitNames[suit]);
    };

makeCard.precedes = function(cardB) { //-->false,true,NaN
        var diff= cardB.rank()-this.rank();
        if (isNaN(diff))
            return NaN;
        return diff==1 || diff==-12;
    };
    
makeCard.sameColor = function(cardB) { //-->false,true,NaN
        var colorA=this.color(), colorB=cardB.color();
        if (Number.isNaN(colorA) || Number.isNaN(colorB))
        // must use Number.isNaN() instead of isNaN(), which returns true for non-numeric strings
            return NaN;
        return colorA==colorB;
    };
    
makeCard.nextInSuit = function() {//--> 0..51,NaN
        var cardA = this.id;
        nextCard = makeCard.isValid(cardA,0,51) && cardA+4;
        if (nextCard>51) nextCard-=52;
        return nextCard;
    };
    
makeCard.prevInSuit = function() {//--> 0..51,NaN
        var cardB = this.id;
        prevCard = this.isValid(cardB,0,51) && cardB-4;
        if (prevCard<0) prevCard+=52;
        return prevCard;
    };
