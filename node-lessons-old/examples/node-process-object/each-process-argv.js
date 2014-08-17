allTheArgs();

function allTheArgs () {
  process.argv.forEach(function (item) {
    console.log(item);
  });
}