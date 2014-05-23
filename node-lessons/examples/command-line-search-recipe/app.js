var recipes = ['pie','burger','pizza', 'quiche'];

printResult();

function printResult () {
  if (findRec()) {
    console.log('We do indeed have ' + process.argv[2] + ' in our collection');
  } else {
  console.log('Sorry, we don\'t have that one');
  }
}

function findRec () {
  return recipes.some(function (item) {
    return (process.argv[2] === item);
  });
}

