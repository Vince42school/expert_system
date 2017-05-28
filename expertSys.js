var fs        = require("fs");
var mainObj   = {};

function containOnlyMajLetters(str) { return (/^[A-Z]+$/.test(str)); }

function queryIsUnvalid () {
  let q = mainObj.query;
  if (q.length > 0 && q[0] == '?' && containOnlyMajLetters(q.substring(1)))
    return true;
  return false;
}
function factsAreUnvalid () {
  let f = mainObj.query;
  if (f.length > 0 && f[0] == '=' && containOnlyMajLetters(f.substring(1)))
    return true;
  return false;
}
function rulesAreUnvalid () {
}

mainObj.isValid = function () {
  if (queryIsUnvalid())        { console.log('This query is not Valid '); return false; }
  else if (factsAreUnvalid())  { console.log('This facts are not Valid'); return false; }
  else if (rulesAreUnvalid())  { console.log('This rules are not Valid'); return false; }
  return true;
}

function respondToQuery() {
  console.log('{DoTheSwamp}');
}

function expertSys(d) {
  mainObj.rules = d.split('\n').map(e => e.split('#')[0]).filter(e => e.length > 0).map(e => e.replace(/ /g,''));
  mainObj.query = mainObj.rules[mainObj.rules.length - 1];
  mainObj.facts = mainObj.rules[mainObj.rules.length - 2];
  mainObj.rules.splice(mainObj.rules.length - 2, 2);
  if (mainObj.isValid())
    respondToQuery();
}

function start() {
  if (!process.argv[2]) { console.log('You have to give me a file to work with'); return; }
  fs.readFile(process.argv[2], "utf8", function(err, data) {
      if (err) { console.log('Err while atempting to reading the file : '); throw err; }
    expertSys(data);
  });
}

// start(process.argv)

console.log(containOnlyMajLetters(process.argv[2]));
