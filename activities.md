<div id="table-of-contents">
<h2>Table of Contents</h2>
<div id="text-table-of-contents">
<ul>
<li><a href="#sec-1">1. Group Activities</a>
<ul>
<li><a href="#sec-1-1">1.1. Core Javascript Activities</a></li>
</ul>
</li>
</ul>
</div>
</div>

# Group Activities<a id="sec-1" name="sec-1"></a>

## Core Javascript Activities<a id="sec-1-1" name="sec-1-1"></a>

-   Understanding Code Execution
    -   Type: worksheet
    -   Time: 15 minutes
    -   Groups are given a series of expressions on worksheets
    -   Students need to, by hand, evaluate the code using their understanding of
        -   built in functions
        -   evaluation order in javascript
-   Euclid's Algorithm
    -   Type: coding
    -   Time: 30 minutes
    -   Pre-requisites: functions, numbers, while loops
    -   As a group, implement the basic version of Euclid's algorithm to find the GCD
    -   When groups are done, they trade code with other group who comments on their solution and tests it
-   Bug Finding
    -   Type: coding
    -   Time: 15-20 minutes
    -   Pre-requisites: whatever required by the buggy code, but probably functions, numbers, strings, iteration, and basic objects
    -   As groups, students are given a piece of buggy code that performs a simple task
    -   Given the description of what the code is **supposed** to do, find cases that demonstrate the bug
    -   Fix the bug
-   Scope Diagrams
    -   Type: worksheet
    -   Students are given several functions, including nested functions, and have to diagram out **by hand** what each use of a variable is referring to
    -   Time: 10 minutes
    -   Pre-requisites: functions, scopes
-   `this` Is Fun
    -   Similar to scope diagrams
    -   Students are given example code and need to **by hand** diagram out how the various instances of usage of `this` are resolved
    -   Probably best presented as a worksheet
    -   Time: 10 minutes
    -   Pre-requisites: `this`
-   Managing State
    -   Worksheet exercise
    -   Given a block of code, evaluate it line by line and fill in what the values of all the variables in scope are after each line executes
    -   Times: 20 minutes
    -   Pre-requisites: scope, functions, variables, and iteration and objects if you want it to be interesting. There could potentially be two different versions, one pre-objects and another once objects have been introduced just to make it more illustrative
-   Designing an Object
    -   Type: coding
    -   Time: 40 minutes
    -   Pre-requisites: functions, objects, iteration, callbacks, `this` (so basically core javascript?)
    -   Description:
        -   Students will design a linked list datatype
        -   Linked lists are, in a sense, similar to how lists in jQuery are so this might be a good programming exercise
        -   A node in a list is a pair of
            -   a piece of data
            -   a reference to another node, if any, or null
        -   Students will write:
            -   A constructor to make a new list
            -   A .push() method that will add an element to the beginning of the list
            -   A .pop() method that will remove an element from the begging of the list and return its value
        -   To be given as homework afterwards:
            -   A .append() method that will add an element to the *end* of the list
            -   A .forEach method that will perform an action for each element of the list
