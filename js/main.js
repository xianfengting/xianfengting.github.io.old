
// 初始化。
(function () {
	$(function () {
		$("#date").datepicker();
	});
	
	parseActivationCodeUsageStateMapFromLocalFile();
})();

var activationCodeArray = [
	"ED8ED022-83AC-42a4-00A9-00002E"
]

var __last_operationFunc = null;
var __last_operationFuncInvokingDelay = 0;
var __last_isActivationCompletedSuccessfully = false;

function validateOperationByActivationCode(operationFunc, operationFuncInvokingDelay) {
	__last_isActivationCompletedSuccessfully = false;
	__last_operationFunc = operationFunc;
	__last_operationFuncInvokingDelay = operationFuncInvokingDelay;
	
	showInputDialog("输入激活码", "此操作需要激活码才能继续，请输入激活码。\n激活码的格式:\nXXXXXXXX-XXXX-XXXX-XXXX-XXXXXX",
		function (inputedActivationCode) {
			// 清空输入框。
			$("#dialog_input").val("");
			
			activationCodeUsageStateMap.forEach(function (item, key, mapObj) {
				if (!item) {
					if (key.toString() == inputedActivationCode.toString()) {
						__last_isActivationCompletedSuccessfully = true;
						setTimeout("showDialogWithOKButton('激活','激活成功！点击“确定”按钮继续。',function(){setTimeout('__last_operationFunc()',__last_operationFuncInvokingDelay)});", 1000);
						return;
					}
				}
			});
			
			/*for (var i = 0; i < activationCodeArray.length; i++) {
				if (activationCodeArray[i] == inputedActivationCode.toString()) {
					setTimeout("showDialogWithOKButton('激活','激活成功！点击“确定”按钮继续。',function(){setTimeout('__last_operationFunc()',__last_operationFuncInvokingDelay)});", 1000);
					return;
				}
			}*/
			
			if (!__last_isActivationCompletedSuccessfully) {
				setTimeout("showDialog('激活', '激活失败，原因:未找到激活码以适用于你输入的激活码“" + inputedActivationCode + "”。操作无法继续。');", 1000);
			}
		});
}
