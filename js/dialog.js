
// 对话框初始化
$(function () {
	$("#dialog").dialog({  
		//dialogClass:'alert',  
		draggable: true,   //true 可拖动 flase不可拖动  
		modal:true ,       //true带有遮罩;false 没有遮照  
		autoOpen:false,        //false 不会自动打开 ;true 会自动打开  
		height:"auto",     //值可以为“auto”,或者为具体像素，比如：400  
		maxHeight:300,     //可以调整的最大高度  
		resizable:true,    //可调整大小的  
		show:500,           //数字或者"slow"
		hide:500,           //数字或者"slow"
		title:"",
		
		open: function( event, ui ) {
			if (isInputMode) {
				$("#dialog_input").show();
			}
			
			isDialogShowing = true;
		},
		close: function () {
			if (isInputMode) {
				$("#dialog_input").hide();
				isInputMode = false;
			}
			
			isDialogShowing = false;
		}
	});
	$("#dialog_input").hide();
});

var isDialogShowing = false;
var isInputMode = false;
var lastOnOkButtonClickCallbackFunction = null;
var lastOnInputFinishedCallbackFunction = null;

/**
 * 显示对话框。
 * title: 标题。
 * message: 消息。
 */
function showDialog(title, message) {
	showDialogWithOKButton(title, message, function () {});
}

/**
 * 显示对话框。
 * title: 标题。
 * message: 消息。
 * onOkButtonClick：当确定按钮被点击时回调此函数。
 */
function showDialogWithOKButton(title, message, onOkButtonClick) {
	if (isDialogShowing) {
		throw "The dialog has been showing. Please wait until it's closed.";
	}
	
	lastOnOkButtonClickCallbackFunction = onOkButtonClick;
	
	// 显示对话框前先设置一下对话框。
	$(function () {
		$( "dialog" ).dialog( "option", "title", title );
		$("#dialog_message").text(message);
		$("#dialog").dialog({
			buttons:{  
				ok: function(){   
					// 回调。
					try {
						lastOnOkButtonClickCallbackFunction();
					} catch (ex) {
						console.log("Dialog: An exception occurred by calling back the function. Exception: " + ex);
					}
					$(this).dialog("close");  
				}
			}
		});
	});
	
	// 显示对话框。
	$("#dialog").dialog("open");
}

function showInputDialog(title, message, onInputFinished) {
	isInputMode = true;
	lastOnInputFinishedCallbackFunction = onInputFinished;
	showDialogWithOKButton(title, message, function () {
		var content = $("#dialog_input").val();
		try {
			lastOnInputFinishedCallbackFunction(content);
		} catch (ex) {
			console.log("Dialog: An exception occurred by calling back the function. Exception: " + ex);
		}
	});
}
