var fs        = require("fs");
var mainObj   = {};
var redStart  = '\x1b[31m';
var redEnd    = '\x1b[0m';
var tmpRules  = [];

function containOnlyMajLetters(str) {
  if (str.length == 0)
    return true;
  return (/^[A-Z]+$/.test(str));
}

function rulesAreUnvalid () {
  mainObj.rules.forEach(e => createRulesNode(e));
  return false;
}

function queryIsUnvalid () {
  let q = mainObj.query;
  if (q.length > 0 && q[0] == '?' && containOnlyMajLetters(q.substring(1))) {
    mainObj.query = mainObj.query.split('')
    return false;
  }
  return true;
}

function factsAreUnvalid () {
  let f = mainObj.facts;
  let sub = f.substring(1);
  if (f.length > 0 && f[0] == '=' && containOnlyMajLetters(sub))
    return false;
  return true;
}

function checkBracket (arr) {
  let error = false;
  arr.forEach(function(e) {
    let n_bracket = 0;
    for (let i = 0; i < e.length; i++) {
      if (e[i] == '(')
       n_bracket++;
      else if (e[i] == ')') {
        if (n_bracket <= 0)
          error = true;
        else { n_bracket--; }
      }
    }
    if (n_bracket != 0) { console.log(redStart + 'ERROR while parsing Rules 1' + redEnd); error = true; }
  })
  return error;
}

function createLogicNode (e) {
}

function createRulesNode(e) {
  let sign;
  let rtn = {};

  if (e.includes('<=>'))      { sign = '<=>'}
  else if (e.includes('=>'))  { sign = '=>'}
  else { console.log(e); console.log(redStart + 'ERROR while parsing Rules dqwd' + redEnd); process.exit(); }

  e = e.split(sign);
  if (!containOnlyMajLetters(e[0])) { e[0] = createLogicNode(e[0])}
  if (!containOnlyMajLetters(e[1])) { e[1] = createLogicNode(e[1])}
  console.log(e);
  if (e.length != 2 || checkBracket(e)) {
    console.log(redStart + 'ERROR while parsing Rules ' + redEnd); process.exit();
  }
  else {
    rtn = { sign: sign, lVal: e[0], rVal: e[1] }
    tmpRules.push(rtn);
  }
}

mainObj.isValid = function () {
  if (queryIsUnvalid())        { console.log(redStart + 'This QUERY is not Valid ' + redEnd); return false; }
  else if (factsAreUnvalid())  { console.log(redStart + 'This FACTS are not Valid' + redEnd); return false; }
  else if (rulesAreUnvalid())  { console.log(redStart + 'This RULES are not Valid' + redEnd); return false; }
  return true;
}

function answerQuery() {
  console.log('{DoTheSwamp}');
  console.log(tmpRules);
}

function expertSys(d) {
  mainObj.rules = d.split('\n').map(e => e.split('#')[0]).filter(e => e.length > 0).map(e => e.replace(/ /g,''));
  if (mainObj.rules.length <= 2) { console.log(redStart + 'File not Valid' + redEnd); return false; }
  mainObj.query = mainObj.rules[mainObj.rules.length - 1].trim();
  mainObj.facts = mainObj.rules[mainObj.rules.length - 2].trim();
  mainObj.rules.splice(mainObj.rules.length - 2, 2);
  if (mainObj.isValid())
    answerQuery();
}

function start() {
  if (!process.argv[2]) { console.log(redStart + 'You have to give me a file to work with' + redEnd); return; }
  fs.readFile(process.argv[2], "utf8", function(err, data) {
      if (err) { console.log(redStart + 'Err while atempting to reading the file' + redEnd); process.exit(); }
    expertSys(data);
  });
}

start()
