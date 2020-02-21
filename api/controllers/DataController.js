module.exports = {
  index: (req, res) => {
  	let getQuery = `SELECT * FROM sample ORDER BY sample.created ASC`;

  	Samples.query(getQuery, (err, samples) => {
            if (err || !samples) {
                res.json({
                    message: err || 'error in sql query'
                });
            } else {
                res.json(samples.rows);
            }
        });

  },

  create: (req, res) => {
  	let sample = req.body;

  	if(!sample.type || !sample.value){
  		let error1 = new Error('Unsupported data structure');
  		return res.badRequest(error1);
  	}

  	if(sample.type !='volume' && sample.type !='temperature' && sample.type !='pressure'){
  		let error2 = new Error('Unsupported type');
  		return res.badRequest(error2);
  	}

  	if(!Number.isInteger(sample.value)){
  		let error3 = new Error('Value should be an integer');
  		return res.badRequest(error3);
  	}

  	let setQuery = `INSERT INTO sample (type, value, created) 
  	VALUES ('${sample.type}', ${sample.value}, NOW());`;

  	Samples.query(setQuery, (err, samples) => {
            if (err || !samples) {
                res.json({
                    message: err || 'error in sql query'
                });
            } else {
                res.json({id:samples.insertId});
            }
        });

  },

  update: (req, res) => {
  	let sample = req.body;

  	if(!sample.id){
  		let error = new Error('Id is required property');
  		return res.badRequest(error);
  	}

  	if(!sample.type && !sample.value){
  		let error1 = new Error('Unsupported data structure');
  		return res.badRequest(error1);
  	}

  	if(sample.type && sample.type !='volume' && sample.type !='temperature' && sample.type !='pressure'){
  		let error2 = new Error('Unsupported type');
  		return res.badRequest(error2);
  	}

  	if(sample.value && !Number.isInteger(sample.value)){
  		let error3 = new Error('Value should be an integer');
  		return res.badRequest(error3);
  	}

  	let setQuery = `UPDATE sample SET`;
  	if(sample.type){
  		setQuery = setQuery + ` type = '${sample.type}' `;
  	}

  	if(sample.type && sample.value){
  		setQuery = setQuery + `,`;
  	}

  	if(sample.value){
  		setQuery = setQuery + ` value = '${sample.value}' `;
  	}
  	
  	setQuery = setQuery + `WHERE sample.id = '${sample.id}'`;

  	console.log('DataController.js line 84: ', setQuery);

  	Samples.query(setQuery, (err, samples) => {
            if (err || !samples) {
                res.json({
                    message: err || 'error in sql query'
                });
            } else {
                res.json({affectedRows:samples.affectedRows});
            }
        });

  },

  delete: (req, res) => {
  	let sample = req.body;

  	if(!sample.id){
  		let error = new Error('Id is required property');
  		return res.badRequest(error);
  	}

  	let setQuery = `DELETE FROM sample WHERE sample.id = '${sample.id}'`;

  	Samples.query(setQuery, (err, samples) => {
            if (err || !samples) {
                res.json({
                    message: err || 'error in sql query'
                });
            } else {
                res.json({affectedRows:samples.affectedRows});
            }
        });

  }
};