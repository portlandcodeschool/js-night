**a)**
Your function should behave exactly like this, but without using &&:
```
function and3(a,b,c) {
	return a && b && c;
}
```

Here are two equivalent solutions:
```
function and3(a,b,c) {
	if (a) {
		if (b) {
			return c;
		} else {
			return b;
		}
	} else {
		return a;
	}
}

function and3(a,b,c) {
  return a? (b? c: b): a;   //nested ternary conditional operator
}
```



**b)**
```
function andN(n,values) {
  	for (var i=0; i<n; i++) {
    	if (!values[i]) {
			return values[i]; //return first falsish val
		}
  	}
  	if (n>0) {
    	return values[n-1]; //or else last (truish) val
    }
}
```

**c)**

The && operator only evaluates its operands as needed, but a function call evaluates all its arguments.  A function call like `and3(x=0,x=1,x=2)` and the expression `(x=0 && x=1 && x=2)` may return the same output, but they will leave x holding a different value.
