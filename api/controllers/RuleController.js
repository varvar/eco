module.exports = {
  index: (req, res) => {
  	let getQuery = `SELECT * FROM rule ORDER BY rule.id ASC`;

  	Rules.query(getQuery, (err, rules) => {
            if (err || !rules) {
                res.json({
                    message: err || 'error in sql query'
                });
            } else {
                res.json(rules.rows);
            }
        });

  },

  create: (req, res) => {
  	let mess = req.body;

  	if(!mess.rule){
  		let error1 = new Error('Unsupported data structure');
  		return res.badRequest(error1);
  	}

  	let setQuery = `INSERT INTO rule (rule) VALUES ('${mess.rule}');`;

  	Rules.query(setQuery, (err, rules) => {
            if (err || !rules) {
                res.json({
                    message: err || 'error in sql query'
                });
            } else {
                res.json({id:rules.insertId});
            }
        });

  },

  update: (req, res) => {
  	let mess = req.body;

  	if(!mess.id){
  		let error = new Error('Id is required property');
  		return res.badRequest(error);
  	}

  	if(!mess.rule){
  		let error2 = new Error('Rule is required property');
  		return res.badRequest(error2);
  	}

  	let setQuery = `UPDATE rule SET rule = '${mess.rule}' WHERE rule.id = '${mess.id}'`;

  	Rules.query(setQuery, (err, rules) => {
            if (err || !rules) {
                res.json({
                    message: err || 'error in sql query'
                });
            } else {
                res.json({affectedRows:rules.affectedRows});
            }
        });

  },

  delete: (req, res) => {
  	let mess = req.body;

  	if(!mess.id){
  		let error = new Error('Id is required property');
  		return res.badRequest(error);
  	}

  	let setQuery = `DELETE FROM rule WHERE rule.id = '${mess.id}'`;

  	Rules.query(setQuery, (err, rules) => {
            if (err || !rules) {
                res.json({
                    message: err || 'error in sql query'
                });
            } else {
                res.json({affectedRows:rules.affectedRows});
            }
        });

  }
};