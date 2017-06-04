/*
**	data :
**		type : OPERAND / CONDITION
**		name; (if OPERAND; else NULL)
**		conditionFunction; (if CONDITION; else NULL)
*/

/*
**	node :
**		data;
**		nodes : up (== parent), left, right;
*/

/*
**	rule : 
**		operands : array[];
**		sign;
**		factNode;
**		resultNode;
*/

/*
** Rules array
*/
var		rulesArray = [];

/*
**	up, left and right can be NULL
**	usage : new node();
*/
function	node(data, up, left, right)
{
	this.data = data;
	this.up = up;
	this.left = left;
	this.right = right;
}

/*
**	usage : new rule();
*/
function	rule()
{
	/*
	 *	PARSING
	 */
}
