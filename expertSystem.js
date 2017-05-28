fs = require('fs');

var operator = [['=>', '<=>'],
				['(', ')'],
				['+', '|', '^'],
				['!']];

fs.readFile(process.argv[2], 'utf8', function (err,data) {
	if (err) 
		console.log('file not found.');
	else
		calculExpert(data);
});

function calculExpert(data) {
 	data = data.split('\n').map(e => e.replace(/#.*/g, '').trim());
 	data = data.filter(e => e.length > 0);
	console.log(data);
}
