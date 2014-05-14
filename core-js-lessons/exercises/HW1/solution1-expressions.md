
**a)** `"1" == 1`
> true

**b)** `"1" === 1`
> false

**c)** `true == "true"`
> false

**d)** `false== ""`
> true

**e)** `x++ == ++x`
> false

**f)** `++x == x++`
> true UNLESS x is non-numeric string

**g)** `"1"+x == 1+x`
> true when x is any string

**h)** `"0"+1 == 1`
> true

**i)** `(typeof (x+1))==(typeof x)`	
> true if x is number or string

**j)** `(x-=x)? x: (typeof x)`
> "number"

**k)** `(x*1 == x) || ((typeof x) != "number")`
> true UNLESS x is NaN

**l)** `(x=(typeof (x+(typeof x))))==x`
> true

**m)** `x=-1,0,-x---1+'0'+x`
> "00-2"

