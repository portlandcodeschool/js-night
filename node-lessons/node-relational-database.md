*General Questions/ Issues*
- Using psql
- Smart Databases, Mongodb

### What is a Relational Database (from PostgreSQL docs tutorial)
- Relation is a math term for table
- Each table is a named collection of rows
- Each row of a table has the same set of columns
- Each column is of a specific data type
- Columns have a fixed order, rows do not
- Tables are grouped into a database
- Databases are grouped into a database cluster

### pre-homework: 

1. Treehouse: Database Foundations: Introduction to Data, Databases, and SQL
2. [Download and Install PSQL App](http://postgresapp.com/)
3. [PostgreSQL DOCS: Tutorial](http://www.postgresql.org/docs/7.4/static/tutorial-start.html)
4. PSQl Challenges: 
    

### Getting PostgreSQL and Seeing if it works
- install this [Postgress.app](http://postgresapp.com/)
- to open the Postgres repl: type `psql`
- this will open up a db with your account name as a test database
- the environment on your machine looks like this: 
    + `yourname=#`
    + this is where you can begin typing commands
- if you were linked into a database on a computer you were not administrating, you might see:
    + `yourname=>`
- if at some point you see `yourname-#` (notice the minus symbol instead of the equals, this just means you didn't finish the PSQL command you were attempting. If you left off the semicolon, for instance, you can type that in and press enter. The prompt will revert back to the state: `yourname=#`. 
- go ahead and press `command + d` to get out of this program

### let's make a new database
- in the terminal, type `createdb testdb` or something similar
- to open this db, type  `psql testdb`
- now you should see `testdb=#`
- go ahead and type in `\h`
- this should bring up a list of helpful tips
- to get out of help, press `q`
- for other types of commands, type `\?`
- again, to quit, `q`
- to get out of the psql program, type \q

### 
for help: ``