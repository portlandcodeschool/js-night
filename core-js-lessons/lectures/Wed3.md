Functions are Objects

Consequently:

1) Multiple Creation forms
* function name() {}
* name = function() {}
* name = new Function() 

2) name of a function is a variable holding a reference

3) functions have no intrinsic name
	a) can be aliased: multiple references to same function-obj
	b) can be temporarily anonymous

4) functions can be shared (e.g. two objects sharing one method)
*  _this_ depends on how fn is called

5) functions can have properties
* Function.length

6) Functions can have methods
* Function.call
* Function.apply

7) Functions can be passed as arguments to other functions
Callbacks
Array.map
array.forEach

8) Functions are subject to operators
Call operator:
()