var makeUser = (function() {
	var sharedLog = [];

	function writeToLog(str) {
		sharedLog.push(this.getName() + ':' + str);
		return true;
	}

	function makeUser(name,passwd) {
		var user = {};
		user.getName = function () {return name};
		user.validate = function (tryPasswd) {return tryPasswd === passwd}; 
		user.record = writeToLog;
		return user;
	}

	makeUser.getLog = function(userObj) {
		if (!userObj) return sharedLog.join('\n');

		var userName = userObj.getName();

		function matchesUser(line) {
			var halves = line.split(':');
			return halves[0] === userName;
		}
		var usersLines = sharedLog.filter(matchesUser);
		return usersLines.join('\n');
	}

	return makeUser;
})();

var clarissa = makeUser('Clarissa','sooperSekret')
var dan = makeUser('Dan','pAsSwOrD');
var ben = makeUser('Ben','JackIsTehCute');
clarissa.record("All your closure are belong to us!");
dan.validate('pAsSwOrD');
dan.record("Variables live in the roundy things");
ben.record("Github for the win!");
dan.record("Properties live in the squarey things");

makeUser.getLog(dan);
makeUser.getLog();