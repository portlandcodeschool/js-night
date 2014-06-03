var makeUser = (function() {
	var sharedLog = [];

	function writeToLog(str) {
		sharedLog.push(this.getName() + ':' + str);
	}

	function makeUser(name,passwd) {
		var user = {};
		user.getName = function () {return name};
		user.validate = function (tryPasswd) {return tryPasswd === passwd}; 
		user.log = writeToLog;
		return user;
	}

	makeUser.showLog = function(userObj) {
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

