
Homework #1
(Due Mon. 9/8)

You need to turn in this homework by cloning this repo, making a new branch with your solutions, and issuing a pull request.
For details, follow the instructions [here]().

---

**1)**
Before testing these expressions in the console, predict what their output will be.  If the output depends on x, identify the conditions when the expression will output true.  Assume the cases are independent, and x is reset to an unknown value before each.

Some of these are tricky!  Don't trust your first instinct.  


**a)** `"1" == 1`
> true

**b)** `"1" === 1`
> false

**c)** `x == 'x'`
> false UNLESS x is literally string 'x'

**d)** `x == (x+'')`
> true UNLESS x is NaN

**e)** `'' == ' '`
> false

**f)** `x = true`
> true

**g)** `var x; x == 'undefined'`
> true UNLESS x was declared earlier with a value

**h)** `'9'<'10'`
> false

**i)** `typeof x + 1 === "number"`
> false

**j)** `typeof x % 2 === "number"`
> false

**k)** `typeof (x % 2) === "number"`
> true

**l)** `x++ == ++x`
> false

**m)** `++x == x++`
> true UNLESS x is non-numeric string

**n)** `"1"+x == 1+x`
> true when x is any string

**o)** `"0"+1 == 1`
> true

**p)** `(typeof (x+1))===(typeof x)`	
> true if x is number or string

**q)** `(x*1 == x) || ((typeof x) != "number")`
> true UNLESS x is NaN

**r)** `(x=(typeof (x+(typeof x))))==x`
> true

**s)** `x=-1,0,-x---1+'0'+x`
> "00-2"

---

All of the following can be solved with ordinary expressions and global variables with primitive values.  You don't need functions, loops, conditionals, or other topics beyond our first class.

 **2)** 
Assume variables x, y, and z are numbers.

**a)**
Write an expression for the mean (i.e. average) of x, y, and z.
```(x+y+z)/3```

**b)**
Write a series of expressions to adjust each of x, y, and z
halfway toward their mean.
```
var mean  = (x+y+z/3);
x = (x+mean)/2;
y = (y+mean)/2;
z = (z+mean)/2;
```
or
```
x+= (mean-x)/2;
y+= (mean-y)/2;
z+= (mean-z)/2;
```

---

**3)**
Suppose you're encoding geometric shapes in a Cartesian coordinate system, and you represent a rectangle with four numeric variables:
l = horizontal position of left edge;
r = horizontal position of right edge;
t = vertical position of top edge;
b = vertical position of bottom edge.

**a)**
Write an expression for the rectangle's area.
```
(r-l)*(t-b)
```

**b)**
Write an expression which is true if the rectangle is taller than it is wide, and false otherwise.
```
(t-b)>(r-l)
```

**c)**
Imagine subdividing your rectangle into 3 equal rows and 3 equal columns, which would create 9 smaller rectangles.
Define four new variables describing the middle smaller rectangle.
(Hint: one of the many solutions is very similar to the solution of **2b**)
```
var l1 = (l + l + r)/3;
var r1 = (r + r + l)/3;
var t1 = (t + t + b)/3;
var b1 = (b + b + t)/3;
```

---

**4)**
Suppose you represent a fraction (_n/d_) with 2 integer variables, with _n_ for the numerator and _d_ for the denominator.
If _n_ is greater than _d_, the fraction is "improper", but it can be rewritten as a proper fraction.  For example, "7/4" is improper, but can be converted to "1 3/4".

Write an expression for a string expressing the proper form of an improper fraction _n/d_.  For example, if n==7 and d==4, your resulting string should be "1 3/4".  You may assume both _n_ and _d_ are positive integers and _n_ > _d_.
(Hint: you'll need the modulo operator _%_, and you'll probably want to create a couple of extra variables.)
```
var num = n % d;
var divisible = n - num;
var wholes = divisible / d;
var result = wholes + ' ' + num + '/' + d;
```
