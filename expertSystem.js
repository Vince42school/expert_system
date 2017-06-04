fs = require('fs');
var type = {
	OR : {value : 0, name : 'OR', cmp : '|'},
	AND : {value : 1, name : 'AND', cmp : '+'},
	XOR : {value : 2, name : 'XOR', cmp : '^'},
	IMPLIES : {value : 3, name : 'IMPLIES', cmp : '=>'},
	IFONLY : {value : 4, name : 'IFONLY', cmp : '<=>'},
	OBRACKET : {value : 5, name : 'OBRACKET', cmp : '('},
	CBRACKET : {value : 6, name : 'CBRACKET', cmp : ')'},
	NEG : {value : 7, name : 'NEG', cmp : '!'},
	OP : {value : 8, name : 'OP', cmp : /[A-Z]+/g}
}

/*
var node = {
	cmp : String,
	isPos : Bool,
	state : Bool,
	type : Enum
}
*/
var	err_parsing = "Bad format."

var operator = [['=>', '<=>'],
				['(', ')'],
				['+', '|', '^'],
				['!']];

var mainO = {};

function isWellFormated(data) {
	let last_line = data[data.length - 1];
	if (last_line[0] != '?' || last_line.match(/[a-z]+/g) != null) {
		console.log(err_parsing);
		return false;
	}
	if (data[data.length - 2][0] != '=') {
		console.log(err_parsing);
		return false;
	}
	return true;

}

function makeRules(e) {
	e = e.replace(/ /g, '');
	let rule;
	console.log(e);
	for (var i = 0; i < e.length; i++) {
		rule = e.split();
	}
	mainO.rules.push();
}

function  createData(data) {
	mainO.rules = [];
	data.forEach(makeRules);
	console.log(mainO.rules)
}

function calculExpert(data) {
 	data = data.split('\n').map(e => e.replace(/#.*/g, '').trim());
 	data = data.filter(e => e.length > 0);
	if (!isWellFormated(data))
		return false;
//	console.log(data);
	createData(data);
	return true;
}

fs.readFile(process.argv[2], 'utf8', function (err,data) {
	if (err) 
		console.log('file not found.');
	else
		calculExpert(data);
});

