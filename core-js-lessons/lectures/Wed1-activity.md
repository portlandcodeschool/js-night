Everybody:
[0:00]

You're all JS expressions!

Each of you, in a moment, is going to think of an JS expression.
But you must evaluate to a particular type, depending on your birthday.
Jan-April evaluate to numbers!
May-Aug evaluate to strings!
Sept-Dec evaluate to some other primitive type!

Now choose an expression with exactly 2 operators, which reduces to the appropriate type.  Be as creative as you want, but you have only one minute!  Go!

Now stand up, each pick one side of the room, and line up in any order you want,
one line per side.  And remember your expression, and its value.

...
Now we're going to build a new kind of thing called an **array**!

Left line first, going down the line from front to back, one at a time, tell me your expression.
As I type these, everyone anticipate the outcome of each...
(Build  array literal `[expr0, expr1... expr8]`)

Now hit return!  All those expressions were evaluated and assembled into a compound structure, an array, and printed to the console.  And then-- poof-- destroyed, because we have no way of referring to it.
So evaluate it again preceded by a variable assignment:
`var left = [...]`

Now we can play with it.

Right line, same process...
`var right = [...]`

Each of you is now a compartment holding the value of your expression, similar to a variable.  But unlike a variable, none of you have an individual name.  Each line gets a collective name, 'left' or 'right'.  We can still get and set your individual values, but we have to use the collective name plus a number, joined with special operator [].

Number thyselves, starting from 0 in each line...
Notice the last number is always one less than the number of elements (people) in the line.

Now, pick a number: 7!
Ask JS for a value: `left[7]`
Person left-7, is that your value?  Yay!  Magic!

Another: right[1]...

Can also set values:
left[3] = right[3].  Sorry left-3, whatever your value was before is gone; you're now equal to right-3.

right[3] += left[0]...

And a great feature of arrays is moving them around, or joining them...
`left = left.concat(right)`

(Right line: everyone, grip shoulder of person in front of you; right-0 follow me over to tail of left...)
And renumber:
Former right-0, you are now left-N, etc...

Let's ask JS for another value:
`left[15]`.
New left-15, is that your value?  Magic!

Now you know arrays.  Thank you for playing, go sit.



