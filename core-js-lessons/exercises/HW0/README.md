
### Homework #1
(Due Monday 9/8)

You need to turn in this homework by cloning this repo, making a new branch with your solutions, pushing to github, and issuing a pull request.
For details, follow the instructions [here](http://portlandcodeschool.github.io/jse/2014/05/12/command-line-and-git-slides/#/14).

---

**1)** (_Difficulty: mixed_)
Before testing these expressions in the console, predict what their output will be.  If the output depends on x, identify the conditions when the expression will output true.  Assume the cases are independent, and x is reset to an unknown value before each.

Some of these are tricky!  Don't trust your first instinct.  


**a)** `"1" == 1`

**b)** `"1" === 1`

**c)** `x == 'x'`

**d)** `x == (x+'')`

**e)** `'' == ' '`

**f)** `x = true`

**g)** `var x; x == 'undefined'`

**h)** `'9'<'10'`

**i)** `typeof x + 1 === "number"`

**j)** `typeof x % 2 === "number"`

**k)** `typeof (x % 2) === "number"`

**l)** `x++ == ++x`

**m)** `++x == x++`

**n)** `"1"+x == 1+x`

**o)** `"0"+1 == 1`

**p)** `(typeof (x+1))===(typeof x)`	

**q)** `(x*1 == x) || ((typeof x) != "number")`

**r)** `(x=(typeof (x+(typeof x))))==x`

**s)** `x=-1,0,-x---1+'0'+x`

---

All of the following can be solved with ordinary expressions and global variables with primitive values.  You don't need functions, loops, conditionals, or other topics beyond our first class.

 **2)** (_Difficulty: easy_)

Assume variables x, y, and z are numbers.

**a)**
Write an expression for the mean (i.e. average) of x, y, and z.

**b)**
Write a series of expressions to adjust each of x, y, and z
halfway toward their mean.

---

**3)** (_Difficulty: easyish_)

Suppose you're encoding geometric shapes in a Cartesian coordinate system, and you represent a rectangle with four numeric variables:

- _l_ : horizontal position of left edge;
- _r_ : horizontal position of right edge;
- _t_ : vertical position of top edge;
- _b_ : vertical position of bottom edge.

**a)**
Write an expression for the rectangle's area.

**b)**
Write an expression which is true if the rectangle is taller than it is wide, and false otherwise.

**c)**
Imagine subdividing your rectangle into 3 equal rows and 3 equal columns, which would create 9 smaller rectangles, identical in shape but varying by position.
Define four new variables describing the centermost small rectangle.
(Hint: one of the many solutions is very similar to the solution of **2b** above.)

---

**4)** (_Difficulty: moderate_)

Suppose you represent a fraction (_n/d_) with 2 integer variables: _n_ for the numerator and _d_ for the denominator.
If _n_ is greater than _d_, the fraction is "improper", but it can be rewritten as a proper fraction.  For example, "7/4" is improper, but it can be rewritten "1 3/4", which is proper.

Write an expression for a string expressing the proper form of an improper fraction _n/d_.  When _n==7_ and _d==4_, your resulting string should be "1 3/4".  You may assume both _n_ and _d_ are positive integers and _n_ > _d_.

(_Hint: you'll need the modulo operator _%_, and you'll probably want to create a couple of extra variables._)
