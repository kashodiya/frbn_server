$(function(){

	var logList = $('#logList');
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

	/*
	$("form[action='uploadFile']").click(function () {
		var filename = $("#apkFile").val();
		$.ajax({
			type: "POST"
			, url: "uploadFile"
			, enctype: 'multipart/form-data'
			, data: {
				file: filename
			}
			, success: function () {
				alert("Data Uploaded: ");
			}
		});
		return false;
	});
	*/

	function appendLog(message){
		logList.prepend('<li>'+message+'</li>');
	}


});