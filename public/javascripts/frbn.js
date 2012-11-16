$(function(){

	var logList = $('#logList');
	var broadcastFormTitle = $("form[action='broadcast'] input[name='title']");
	var broadcastFormMessage = $("form[action='broadcast'] textarea[name='message']");
	var broadcastFormCategory = $("form[action='broadcast'] select[name='category']");
	var broadcastFormDistrict = $("form[action='broadcast'] select[name='district']");
	
	loadListOfActivations();
	loadListOfRegistrations();
	loadListOfNotifications();

	$("form[action='broadcast']").submit(function(){
		console.log($(this).attr('action'));
		console.log($(this).serialize());
		$.ajax({
			type: 'POST'
			, url: $(this).attr('action')
			, dataType: 'json'
			, data: $(this).serialize()
			, success: function(data){
				console.log(data);
				if(data.status == 'OK'){
					appendLog('Broadcast was successful');
					loadListOfNotifications();
				}else{
					appendLog('Broadcast failed.');
				}
			}
			, error: function(){
				appendLog('Failed to call broadcast.');
			}
		});
		return false;
	});

	function loadListOfNotifications(){
		var listOfNotifications = $("#listOfNotifications");
		listOfNotifications.html('loading...');
		$.ajax({
			url: 'data/listOfNotifications'
			, success: function(data){
				listOfNotifications.empty();
				listOfNotifications.append(data);
			}
			, error: function(){
				listOfNotifications.html('Error loading data.');
			}
		});
	}

	function loadListOfRegistrations(){
		var listOfRegistrations = $("#listOfRegistrations");
		listOfRegistrations.html('loading...');
		$.ajax({
			url: 'data/listOfRegistrations'
			, success: function(data){
				listOfRegistrations.empty();
				listOfRegistrations.append(data);
			}
			, error: function(){
				listOfRegistrations.html('Error loading data.');
			}
		});
	}



	function loadListOfActivations(){
		var listOfActivations = $("#listOfActivations");
		listOfActivations.html('loading...');
		$.ajax({
			url: 'data/listOfActivations'
			, success: function(data){
				listOfActivations.empty();
				listOfActivations.append(data);
			}
			, error: function(){
				listOfActivations.html('Error loading data.');
			}
		});
	}

	$('.loadNotification').live('click', function(){
		var notificationId = $(this).data('notification-id');
		broadcastFormTitle.val($('#' + notificationId + ' .title').text());
		broadcastFormMessage.val($('#' + notificationId + ' .messageBody').text());
		broadcastFormCategory.val($('#' + notificationId + ' .category').text());
		broadcastFormDistrict.val($('#' + notificationId + ' .district').text());
		appendLog('Broadcast form loaded.');
		return false;
	});

	$('.removeNotification').live('click', function(){
		$.ajax({
			url: $(this).attr('href')
			, success: function(data){
				loadListOfNotifications();
				appendLog('Notification removed.');
			}
			, error: function(){
				appendLog('Error removing notification.')
			}
		});
		return false;
	});

	/*

	$("form[action='uploadFile']").submit(function () {
		var filename = $("#apkFile").val();
		$.ajax({
			type: "POST"
			, url: "uploadFile"
			, enctype: 'multipart/form-data'
			, data: {
				file: filename
			}
			, success: function () {
				appendLog('File: ' + filename + ' - uploaded successfully.');
			}
			, error: function () {
				appendLog('File: ' + filename + ' - failed to upload.');
			}
		});
		return false;
	});
	*/

	function appendLog(message){
		logList.prepend('<li>'+message+'</li>');
	}


});