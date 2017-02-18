var express = require('express');
var router = express.Router();

var multiparty = require('multiparty');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var driverless_cont = require('../controller/test/driverless_cont');
var startSpeedTracking = false;

var SerialPort = require("serialport");
var Torque = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var delta = 1.1;
// /* GET home page. */     sdsdc
router.get('/', function(req, res, next) {
		res.redirect('/driverless');
});

//==================================================================
// /* GET home page. */     sdsdc
router.get('/driverless', function(req, res, next) {
	var serialport = new SerialPort("/dev/cu.usbmodem1421");
	serialport.on('open', function(){
	  console.log('Serial Port Opened');
	  serialport.on('data', function(data){

		console.log(data[0]);
		if(Torque.length == 83){
			Torque.splice(0,1)
		}
		if(data[0] ==9){	
			startSpeedTracking = true;
		}
		else{
			T1 = data[0]*4;
			T1 = ((0.0635*T1)-31.25)-delta;
			Torque.push(T1)
		}

	  });
	});

	res.render('driverless');
});

// /* POST home page. */     used
router.post('/driverless/setSpeed', function(req, res, next) {
	driverless_cont.setSpeed(req.params.speed);
	// res.send('success')
});


// /* POST home page. */     used
router.post('/driverless/getTorque', function(req, res, next) {
	// console.log(Torque.length+" ----> "+Torque);
	res.send(Torque)
});

// /* POST home page. */     used
router.post('/driverless/isSpeedStarted', function(req, res, next) {
	res.send(startSpeedTracking)
});
//==================================================================


module.exports = router;
