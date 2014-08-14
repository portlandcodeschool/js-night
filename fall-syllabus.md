<div id="table-of-contents">
<h2>Table of Contents</h2>
<div id="text-table-of-contents">
<ul>
<li><a href="#sec-1">1. General Notes by CL:</a></li>
<li><a href="#sec-2">2. Week:</a></li>
<li><a href="#sec-3">3. Week:</a></li>
<li><a href="#sec-4">4. Week:</a></li>
<li><a href="#sec-5">5. Week:</a></li>
<li><a href="#sec-6">6. Week:</a></li>
<li><a href="#sec-7">7. Week:</a></li>
<li><a href="#sec-8">8. Week:</a></li>
<li><a href="#sec-9">9. Week:</a></li>
<li><a href="#sec-10">10. Week:</a></li>
<li><a href="#sec-11">11. Week:</a></li>
<li><a href="#sec-12">12. Week:</a></li>
<li><a href="#sec-13">13. Week:</a></li>
<li><a href="#sec-14">14. Week:</a></li>
<li><a href="#sec-15">15. Week:</a></li>
<li><a href="#sec-16">16. Week:</a></li>
<li><a href="#sec-17">17. Week:</a></li>
</ul>
</div>
</div>

# General Notes by CL:<a id="sec-1" name="sec-1"></a>

Problems that we had in the summer iteration of the course:
-   Too much disconnect between the client and server pieces, students didn't seem to know what-code-ran-where nor did some of them understand what the point of a server was and the fact that it ran independently of the browser
-   Students like assignments were unrelated to "real problems", were "too mathematical", "too difficult", and had difficulty starting the assignments
-   Students definitely were treating Backbone and Express as magic. Seems like a lot of things started to become incantations by the end of the course
-   Some students didn't feel like they were getting their hands dirty through all the various pieces even towards the end of the capstone. Some weaker students appealing to experience they already had in front-end design rather than doing new things.

My proposed modifications to the curriculm/syllabus, based upon discussions we instructors have had, are as follows. I argue that we address the issues above as follows:

-   Flipping the order of the client and server material appeals to visual understanding of how code functions, gives students more immediate visceral feedback about what their code does, and makes a better intermmediate stepping stone towards programming of entire applications
-   Spending more time up front on Backbone early on allows for mini-projects as assignments that can, in essence, be used to test out an individual's ideas on capstone projects in advance.
-   By presenting just *one* way to do server side programming we'll hopefully both buy time and get more conceptual clarity on how that one way actually works
-   We pare down the amount of middleware used in Express, per conversations with Dan, and thus the amount of time that needs to be spent on middleware.
-   We pare down the amount of time spent on automation

The underlying philosophy here is that we want to keep the number of moving parts students need to understand to a minimum and that entails charting out a very specific path to building a full client-and-server application.

# Week:<a id="sec-2" name="sec-2"></a>

-   Lecture:
    -   JS Console; Expressions, Operators;
    -   Variables, Assignment, Scope;
    -   Primitive types; String concatenation; Auto-conversion
    -   CL's comments: 
        -   can probably spend less time on auto-conversion so early
        -   say less about scope up front, since it doesn't make much sense without functions
-   Lecture:
    -   Array basics, indexing
    -   Conditionals & Branching; Truthiness; Boolean/Branching Operators (`&&`, `||`);
    -   ScratchPad; Blocks; Loops (`while`, `for`); `console.log`;
    -   Function basics: parameters, return values, definition vs. call;
    -   CL's comments:
        -   add in more on scope when we get to function definitions
        -   maybe less on scratchpad? That's my own bias because I find it to be having annoying quirks

# Week:<a id="sec-3" name="sec-3"></a>

-   Lecture: 
    -   Review: Functions, Ternary Conditional Operator
    -   Defensive Programming; Basic Testing with Assertions
    -   Objects: incremental creation, literal notation, nesting; Properties, membership operators (`[]` and `.`), chaining;
    -   Property creation, deletion, enumeration (`in` operator, `for...in` loops); Properties vs. Variables
-   Lecture:
    -   Review: Object creation, membership operators
    -   References; Object linking and sharing, shallow copy and compare, `null`, reference arguments
    -   Pseudo-arrays; Arrays as Objects; Built-in Array methods
    -   String methods; String wrapper objects
    -   Custom methods, `this` keyword; examples; 3 roles of objects
    -   git workflow, branching, & assignments;
    -   CL's comments: I'm not convinced that the toolbox pattern is super useful for them to see? In a sense it doesn't show up that much in what they end up doing in this course and, ultimately, once they're at a more advanced level where it'll show up more then they'll know enough to be able to easily recrate the machinery. As such, I've left it out of this lecture where it would have been

# Week:<a id="sec-4" name="sec-4"></a>

-   Lecture:
    -   Functions as Objects; Functions as Arguments, Callbacks;
    -   Call operator, parentheses types; Self-Executing Anonymous Functions;
    -   Function details: Evaluation Phases, Call Objects, Arguments Object; Call Chain, Scopes, Closures; <span class="underline">this</span>
    -   Global Object; Global variables vs. properties
    -   CL's comments: I don't think we really need to cover a lot on the global object. At the beginner level they just need to know that It Exists and that if they're not careful with `this` then they'll accidentally give it properties
-   Lecture:
    -   Object Patterns; Helper Functions, Delegates
    -   Factory Functions; Duplicate vs. Shared Methods

# Week:<a id="sec-5" name="sec-5"></a>

-   Lecture:
    -   Access Control via Closures; Private variables and functions; Closure Modules;
-   Lecture:
    -   Constructors, <span class="underline">new</span>; Wrapper Objects and Converters;
    -   Prototypes, Instance Methods

# Week:<a id="sec-6" name="sec-6"></a>

-   Lecture: Class methods; Inheritance and Subclassing;
-   Lecture: Core JS Review

# Week:<a id="sec-7" name="sec-7"></a>

-   Lecture: Intro to JQuery and the DOM
    -   What is the DOM?
    -   Introduction to browser events
    -   Accessing elements in JQuery
    -   Simple event handlers in JQuery
-   Lecture: More JQuery examples, Backbone starts, Backbone Routes, Simple Views, Simple Models
    -   CL's comments: basically this week and next we do everything we can in Backbone without needing a server, which is most of everything except data persistance. It can easily be motivated by showing them that everything disappears if you hit refresh

# Week:<a id="sec-8" name="sec-8"></a>

-   Lecture: Nested Views in Backbone, Backbone Collections
-   Lecture: More Backbone examples
-   CL's comments: per conversation with Dan taking out the bits on browserify, watchify etc. until the end as special topics

# Week:<a id="sec-9" name="sec-9"></a>

-   Lecture: mini-project week
-   Lecture: mini-project week
-   CL's comments: I think it might be nice to give a breather before starting the server side programming to just build decently complex client-only applications with jQuery and Backbone.

# Week:<a id="sec-10" name="sec-10"></a>

-   Lecture:
    -   internet concepts (http, server, client)
    -   introduction to requests and how request types map to actions in web pages
    -   conceptual introduction to Node
    -   Node modules
    -   Class time to get started on learn you node exercises
-   Lecture: 
    -   Express.js intro
    -   Making basic servers
    -   Routing in Express
    -   Serving up Backbone app as static web page
-   Cl's comments: So this is with the understanding that we'll compress the node introduction to its bare minimum and teach them as much as possible with Express just so that they can get something up and running faster. I still think we can spend some class time getting them set up with the learn you node exercises so that they have something they can experiment with if they want to go deeper. Mostly I think the learn you node exercises are good *programming* practice regardless of the deeper lessons about asynchronous behavior and the event loop

# Week:<a id="sec-11" name="sec-11"></a>

-   Lecture: 
    -   Integrating Backbone with servers
    -   syncing models with servers by url mapping
    -   In-class exercises building small backbone applications
    -   Ajax calls with jQuery
    -   Cross-domain calls with jsonp
-   Lecture: 
    -   The need for persistence
    -   Key-value stores
    -   Orchestrate.io
    -   Integrating Orchestrate into applications

# Week:<a id="sec-12" name="sec-12"></a>

-   Lecture:
    -   Introduction to using APIs
    -   Adding functionality to your app by using another web app
    -   Examples:
        -   Forecast.io
        -   Yelp
        -   Discogs
        -   Flickr
        -   Instagram
        -   ???
    -   CL's comments: Since this is an issue that comes up so much in the capstones it seems reasonable to spend more time explicitly teaching the students how to integrate other services into their own.
-   Lecture: 
    -   Introduction to testing
    -   Examples demonstrating the *importance* of testing
    -   Mocha library
    -   Adding tests to prior examples
    -   CL's comments: including Mocha because this is what Dan mentioned needing to teach this in the future. I'm not convinced that at the end is the right place to introduce it, but I'm also not convinced that there's a better place to put it either

# Week:<a id="sec-13" name="sec-13"></a>

-   Lecture: Advanced Topics (Node, Backbone, and programming skills), group projects underway
-   Lecture: Advanced Topics (Node, Backbone, and programming skills), group projects underway

# Week:<a id="sec-14" name="sec-14"></a>

-   Lecture: Advanced Topics (Node, Backbone, and programming skills), group projects underway
-   Lecture: Advanced Topics (Node, Backbone, and programming skills), group projects underway

# Week:<a id="sec-15" name="sec-15"></a>

-   Lecture: Advanced Topics (Node, Backbone, and programming skills), group projects underway
-   Lecture: Advanced Topics (Node, Backbone, and programming skills), group projects underway

# Week:<a id="sec-16" name="sec-16"></a>

-   Lecture: Advanced Topics (Node, Backbone, and programming skills), group projects underway
-   Lecture: Advanced Topics (Node, Backbone, and programming skills), group projects underway

# Week:<a id="sec-17" name="sec-17"></a>

-   Lecture: Prep and practice for Capstone, other bonus topics
-   Lecture: Prep and practice for Capstone, other bonus topics
