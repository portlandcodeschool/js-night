function makeGetterObj(arg) {
    var x = arg;
    return {getX: function {return x;}};
}

var obj = makeGetterObj(1);
obj.getX(); //1




//Simpler:
function dropbox(arg) {
  var private = arg;
  return function() {return private;};
}

var retrieve = dropbox(3);
retrieve();// 3

//Example:
function borrowLoan(debt) {
    return {amountDue: function() {return debt;},
            chargeInterest: function() {debt*=1.1;},
            makePayment: function(payment) {
                console.log("Debiting your account by "+payment);
                // wire the money here...
                debt-=payment;
            }};
}
var loan = borrowLoan(100);
