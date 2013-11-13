function isBSTinEffect() {
	var d = new Date();

	for (var i = 31; i > 0; i--) {
		var tmp = new Date(d.getFullYear(), 2, i);
		if (tmp.getDay() === 0) {
			lSoM = tmp;
			break;
		}
	}

	for (var k = 31; k > 0; k--) {
		var tmpk = new Date(d.getFullYear(), 9, k);
		if (tmpk.getDay() === 0) {
			lSoO = tmpk;
			break;
		}
	}

	if (d < lSoM || d > lSoO) return false;
	else return true;
}

function isLive() {

		var bst = isBSTinEffect();
		var utc = new Date();
		var now;
		var live;

		if (bst) {

			now = new Date(utc.getUTCFullYear(), utc.getUTCMonth(), utc.getUTCDate(), (utc.getUTCHours() + 1), utc.getUTCMinutes(), utc.getUTCSeconds());

		} else {

			now = new Date(utc.getUTCFullYear(), utc.getUTCMonth(), utc.getUTCDate(), utc.getUTCHours(), utc.getUTCMinutes(), utc.getUTCSeconds());

		}
		
		var day = now.getDay();
		var hours = now.getHours();
		var minutes = now.getMinutes();

		var dayminutes = (hours * 60) + minutes;

		if (day === 1 && dayminutes > 418 && dayminutes < 482) {

				live = true;

		} else if (day === 5 && dayminutes > 778 && dayminutes < 842) {
				
				live = true;
				
		} else {
		
				live = false;
		
		}
		
		return live;

}