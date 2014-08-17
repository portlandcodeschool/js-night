var names = {
    mom: 'Christy',
    dad: 'Jeff',
    sister1: 'Becky',
    sister2: 'Elizabeth'
}

nameSayer(names.dad);
nameSayer(names.mom);

function nameSayer (name) {
  console.log('hey there, ' + name);
}
