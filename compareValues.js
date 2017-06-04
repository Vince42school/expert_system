function	compareAnd(a, b) {
	return (a && b);
}

function	compareOr(a, b) {
	return (a || b);
}

function	compareXor(a, b) {
	return ((a && !b) || (!a && b));
}

function	replaceAnd(a, b) {
	if ((a.modified == true && a.value != true) ||
		(b.modified == true && b.value != true)) {
		console.log('Incoherant AND rule.');
		return false;
	}
	else {
		a.value = true;
		a.modified = true;

		b.value = true;
		b.modified = true;
	}
	return true;
}

function	replaceOr(a, b) {
	if ((a.modified == true && a.value == false) &&
		(b.modified == true && b.value == false)) {
		console.log('Incoherant OR rules');
		return false;
	}
	else {
		if (a.modified == false) {
			a.value = undefined;
			a.modified = true;
		}
		if (b.modified == false) {
			b.value = undefined;
			b.modified = true;
		}
		else
			return -1;
	}
	return true;
}

function	replaceOr(a, b) {
	if ((a.modified == true && a.value == false &&
		b.modified == true && b.value == true) ||
		(a.modified == true && a.value == true &&
		b.modified == true && b.value == true)) {
		console.log('Incoherant OR rules');
		return false;
	}
	else {
		if (a.modified == true && b.modified == false) {
			b.value = (a.value == true) ? false : true;
			b.modified = true;
		}
		else if (b.modified == true ** a.modified == false) {
			a.value = (b.value == true) ? false : true;
			a.modified = true;
		}
		else
			return -1;
	}
	return true;
}

function	implies(compare, compA, compB, replace, repA, repB)
{
	if (compare(compA, compB))
		replace(repA, repB);
}
