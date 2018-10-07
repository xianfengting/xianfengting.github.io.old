
var activationCodeUsageStateMap = new Map();

function parseActivationCodeUsageStateMapFromLocalFile() {
	try {
		$.getJSON("activationCodeUsageState.json", function (data) {
			$.each(data, function (i, item) {
				var activationCode = item.activationCode;
				var isUsed = item.isUsed;
				activationCodeUsageStateMap.set(activationCode, isUsed);
			});
		});
	} catch (ex) {
		//activationCodeUsageStateMap.set("F89C3228-F4B2-44e4-0090-00004E", true);
		//activationCodeUsageStateMap.set("A9163F20-61C9-467d-0089-00005E", false);
	}
	
	if (activationCodeUsageStateMap.size == 0) {
		activationCodeUsageStateMap.set("F89C3228-F4B2-44e4-0090-00004E", true);
		activationCodeUsageStateMap.set("A9163F20-61C9-467d-0089-00005E", false);
	}
}

// TODO
/* saveActivationCodeUsageStateMapToLocalFile() {
	var fso = new ActiveXObject("Scripting.FileSystemObject") 
	var tf = fso.OpenTextFile("", true); 
	tf.Write (arr);
	tf.Close();
}*/
