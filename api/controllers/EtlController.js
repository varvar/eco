
const async = require('async');
const R = require('ramda');

/*
	Get last hour pressure
*/
const getLatestSamples = (ctx, cb) => {
	let getQuery = `SELECT * FROM sample WHERE type = 'pressure' AND created >= DATE_SUB(NOW(),INTERVAL 1 HOUR) ORDER BY created DESC`;

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

/*
	Generate multidimensional array of 5 minutes time sets for 1 hour sample
*/
const aggregateTimeSets = (ctx, cb) => {
	let interval = 5;// minutes range
	let start = new Date(ctx.samples[0].created);
	let timeSetsAr = {};
	let currentSection = 0;

	const createTimeSets = x => {
	  if(!timeSetsAr[currentSection]){
	    timeSetsAr[currentSection] = [];
	  }
	  timeSetsAr[currentSection].push(x);
	};

	const samplesIteratee = x => {
	  let ts = new Date(x.created);
	  let diffMs = (start - ts);
	  let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
	  if(diffMins < interval){
	    createTimeSets(x);
	  } else{
	    currentSection++;
	    start = ts;
	    createTimeSets(x);
	  }
	};

	R.forEach(samplesIteratee, ctx.samples);

	ctx.timeSetsAr = timeSetsAr;
	cb(null,ctx);
};

/*
	Generate output array of min/max/average aggregation according to API input
*/
const generateOutput = (ctx, cb) => {
	ctx.output = [];
	if(ctx.set === 'average'){
		const timesetIteratee = (value,key) => {
		  let set = value;
		  const average = set.reduce((total, next) => total + next.value, 0) / set.length;

		  ctx.output.push({
		  	agregationType: ctx.set,
		    time: R.takeLast(1, set)[0].created,
		    interval: 5,
		    pressure:average
		  });
		}

		R.forEachObjIndexed(timesetIteratee, ctx.timeSetsAr);
	} else if (ctx.set === 'max') {
		const timesetIteratee = (value,key) => {
		  let set = value;
		  const max = Math.max.apply(Math, set.map(function(o) { return o.value; }))

		  ctx.output.push({
		  	agregationType: ctx.set,
		    time: R.takeLast(1, set)[0].created,
		    interval: 5,
		    pressure:max
		  });
		}

		R.forEachObjIndexed(timesetIteratee, ctx.timeSetsAr);
	} else if (ctx.set === 'min') {
		const timesetIteratee = (value,key) => {
		  let set = value;
		  const min = Math.min.apply(Math, set.map(function(o) { return o.value; }))

		  ctx.output.push({
		  	agregationType: ctx.set,
		    time: R.takeLast(1, set)[0].created,
		    interval: 5,
		    pressure:min
		  });
		}

		R.forEachObjIndexed(timesetIteratee, ctx.timeSetsAr);
	}
	
	cb(null,ctx);
};

module.exports = {
	index: (req, res) => {
		let setObj = req.params;

		if(!setObj.set){
	  		let error = new Error('aggregation is required property');
	  		return res.badRequest(error);
	  	}

	  	if(setObj.set !== 'max' && setObj.set !== 'min' && setObj.set !== 'average'){
	  		let error = new Error('aggregation type not supported');
	  		return res.badRequest(error);
	  	}

	  	let ctx = {set:setObj.set};

	  	async.seq(
	        getLatestSamples,
	        aggregateTimeSets,
	        generateOutput
	    )(ctx, (err,finalCtx)=>{
	    	if (err)
                return res.json(err);

	    	res.json(finalCtx.output);
	    });
	},

};