function outer1() {
    function nestedFn() {
        console.log("nested this=="+this);
    }
    nestedFn();
}
outer1(); outer1(); outer1();


function outer2() {
  outer2.memberFn();
}
outer2.memberFn=function() {
  console.log("member this=="+this);
}
outer2(); outer2(); outer2();

function outer3() {
    var obj = {delegatedFn:function() {
                console.log("delegated this=="+this);
                }};
    obj.delegatedFn();
}
outer3(); outer3(); outer3();