var makeUser = (function() {// begin IIFE...
	
	var sharedLog = [];  //private; accessible only from functions defined within IIFE

	function writeToLog(str) {
		//writeToLog doesn't need private access to name/passwd,
		//so might as well make it shared between users
		sharedLog.push(this.getName() + ':' + str);
		return true;
	}

	function makeUser(name,passwd) {
		// name and passwd are private; accessible only from two functions defined within makeUser
		var user = {};
		// personal methods unique to each user, with access to name/passwd:
		user.getName = function () {return name};
		user.validate = function (tryPasswd) {return tryPasswd === passwd};
		// method shared by all users:
		user.record = writeToLog; // could also put writeToLog defn here, making it personal method
		return user;
			//external link to user and its methods preserves makeUser scope
			//(including vars name and passwd)
	}

	makeUser.getLog = function(userObj) {
		// method of makeUser; defined within IIFE, so can access sharedLog
		if (!userObj) return sharedLog.join('\n');

		var userName = userObj.getName();

		function matchesUser(line) {//nested helper function, finds userName by closure
			var halves = line.split(':');
			return halves[0] === userName;
		}
		var usersLines = sharedLog.filter(matchesUser);
		return usersLines.join('\n');
	}

	return makeUser;  //external link to makeUser preserves IIFE scope (including sharedLog)
})(); //do this IIFE now!


// Use examples:
var clarissa = makeUser('Clarissa','sooperSekret')
var dan = makeUser('Dan','pAsSwOrD');
var ben = makeUser('Ben','BabyJackIsTehCute');
dan.validate('pAsSwOrD'); //true

clarissa.record("All your closure are belong to us!");
dan.record("Variables live in the roundy things");
ben.record("Github for the win!");
dan.record("Properties live in the squarey things");

makeUser.getLog(dan); //return 2 lines
makeUser.getLog(); // return all lines
