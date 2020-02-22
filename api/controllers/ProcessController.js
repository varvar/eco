
const async = require('async');
const R = require('ramda');

const getRule = (ctx, cb) => {
	let getQuery = `SELECT * FROM rule WHERE rule.id = ${ctx.ruleId}`;

	Rules.query(getQuery, (err, rules) => {
	    if (err) {
	        return cb(err);
	    }

	    if (!rules || rules.rows.length === 0) {
	        return cb({'error':'Rule is missing'});
	    } 

	    ctx.rule = R.head(rules.rows);
	    cb(null,ctx);
	});
};

const getLatesSamples = (ctx, cb) => {
	let getQuery = `SELECT id, type, value, created FROM sample WHERE created IN ( SELECT MAX( created ) FROM sample WHERE type IN ('temperature','volume','pressure') GROUP BY type ) ORDER BY type ASC , created DESC`;

	Samples.query(getQuery, (err, samples) => {
	    if (err) {
	        return cb(err);
	    }

	    if (!samples || samples.rows.length === 0) {
	        return cb({'error':'Samples are missing'});
	    } 

	    ctx.samples = samples.rows;
	    cb(null,ctx);
	});
};

const evaluateRule = (ctx, cb) => {
	let regExp = /\{.*?\}/g;
	let rulesAr=ctx.rule.rule.split('or');
	ctx.rulesFiltered = [];
	const samplesIteratee = x => {
		rulesAr.forEach(element => {
			let matches = element.match(regExp);
			let type = matches[0].substring(1, matches[0].length - 1);
			let applicableRule = element.replace('{'+type+'}', x.value);
			if(type === x.type && eval(applicableRule)){
				ctx.rulesFiltered.push(x);
			};
		});
	};

	R.forEach(samplesIteratee, ctx.samples);
	cb(null,ctx);
};

module.exports = {
	index: (req, res) => {
		let ruleObj = req.params;

		if(!ruleObj.ruleId){
	  		let error = new Error('rule Id is required property');
	  		return res.badRequest(error);
	  	}

	  	let ctx = {ruleId:ruleObj.ruleId};

	  	async.seq(
	        getRule,
	        getLatesSamples,
	        evaluateRule
	    )(ctx, (err,finalCtx)=>{
	    	if (err)
                return res.json(err);
            
            let respObj = {
            	ruleEvaluation: true,
            	samples:finalCtx.rulesFiltered
            }
            if (finalCtx.rulesFiltered.length === 0) 
            	respObj.ruleEvaluation = false;

	    	res.json(respObj);
	    });
	},

};