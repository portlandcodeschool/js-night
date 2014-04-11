*General Questions/ Issues*

# Main Node Topics/ Node-related topics

###Modules, Purpose of Modules, Implementation of Modules in Node.js
    * Reading:
        - [Node Docs entry on Modules](http://nodejs.org/api/modules.html)
        - Start reading [art-of-node](https://github.com/maxogden/art-of-node)
        - [Node Docs on File System, "fs"](http://nodejs.org/api/fs.html)

    * Nodeschool.io, ["learnyounode"](http://nodeschool.io/#learn-you-node)

###Intro to node, http.createServer (1-2 Sessions)
    * Reading:
        - [Node Docs entries on HTTP](http://nodejs.org/api/http.html)
        - [Example Code on Node.js homepage](http://nodejs.org/)
        - Continue reading or re-read [art-of-node](https://github.com/maxogden/art-of-node)
        - Nodeschool.io: Learnyounode and Stream Adventure

###Development servers that render and serve static content (1 session)
    * This development server content will help the students transition to the front-end and especially using Ember.js. 

###Express.js Introduction (1 session)
    * Reading:
        - Express JS Guide[on Amazon](http://www.amazon.com/Express-js-Guide-Comprehensive-Book-ebook/dp/B00G2V3EYA/ref=sr_1_1?ie=UTF8&qid=1395702558&sr=8-1&keywords=Express.js+guide)
        - [Express Docs](http://expressjs.com/api.html)
        - [Node School "ExpressWorks"](http://nodeschool.io/#expressworks)

###Deeper Route Handling With Express.js
    * API handling

###Databases (1-2 sessions)
    * Choices: 
        - LevelDB: a database that is nice to use with node.js (same thread, simple setup, easy to learn, doesn't work with heroku the right way)
        - MongoDB: more complicated, requires a separate thread, there are some free db hosting options connected to Heroku, we will need to investigate those and see which one would work for student projects
        - Orchestrate (currently using): Service that puts a friendly interface on top of multiple database types. Has a free tier that is easy to set up. New and sometimes buggy or slow. Easy to learn. Similar usage and simplicity to levelDb
        - Redis: As easy to use as mongo, if you use a small subset of features. Not sure about any free hosting options. 


    * Reading:
        - [levelup docs](https://www.npmjs.org/package/levelup)
    * Homework:
        - [Level Me Up Scotty!](http://nodeschool.io/#levelmeup)

###Authentication (1 session)

###Heroku or other free host (others: OpenShift, etc.) (1 session, maybe a saturday session, near the end of the course)

# Maybe Topics/ Side Topics: 

###Request.js and using the server as a client/ middleman (<= 1 session)

