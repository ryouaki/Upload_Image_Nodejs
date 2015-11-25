function logDataTime() {
	var date = new Date();
	var month = date.getMonth() + 1;
	var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
	var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
	var second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
	return date.getFullYear()+"-"+month+"-"+date.getDate()+" "+hour+":"+minute+":"+second;
}

exports.LOG = function(msg) {
	if(LOG_FLG == "ALL"||LOG_FLG == "LOG")
		console.log(logDataTime()+": "+msg);
};

exports.ERR = function(msg) {
	if(LOG_FLG == "ALL"||LOG_FLG == "ERR")
		console.error(logDataTime()+": "+msg);
};

exports.secret = function(len) {
	len = len || 32;
	var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; 
	var maxPos = $chars.length;
	var pwd = '';
	for (i = 0; i < len; i++) {
		pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
	}
 	return pwd;
};

LOG_FLG = "ALL";