1) Before testing these expressions and statements in the console, predict what their output will be. Assume the cases are independent.
a) `{dog : "Diefenbaker", occupation : "RCMP"}.dog`
b) `{dog : "Diefenbaker", occupation : "RCMP"}["has flashy uniform"]=true` 
c) `({dog : "Diefenbaker", occupation : "RCMP"}["has flashy uniform"]=true).dog` note: what does this tell you about the need to name objects?
d) extra credit: what should this object be named given your extensive knowledge of mid-90s Canadian television shows?
2) Predict what the final expression in this sequence will return and try to explain why? Draw it out by hand first.
a)
   var Z = function (f) {return f(f);} 
   var id = function (x) {return x;}
   Z(id)(3);
b) 
   var loop1;
   var loop2;
   loop1 = {link : loop2};
   loop2 = {link : loop1};
   loop1.link.link
c) 
   var weird = function (x) { x && weird(x));};
   weird(0);