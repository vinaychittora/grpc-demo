// add info notification on app initialise.
show_info();

// On click of "Fetch Data" CTA, make a get request to flask server
// Render the response if success, else show the error notification.
$("a.fetch-data-btn").bind('click', function(e){
	e.preventDefault();
	toggle_loader();

	$.ajax({
		url: "/usage",
		async: true,
		dataType: "json",
		type: "GET",
		success: function(data){
			render_data_in_table( data['value'] );
			show_info();
		},
		error: function(err){
			console.log(err);
			toggle_loader();
			show_error(err.status ,err.responseText);
		}

	});
});

// Simple scroll top button on the bottom right.
// On click, it scrolls the page back to top.
$("span.move-top").bind("click", function(e){
     $('html, body').animate({scrollTop:0}, 'slow');
});

// A table is added in html already.
// after receiving the reponse from server, loop on the json data
// and append rows.
function render_data_in_table(data){
	$('#meter-usage-data-table tbody').empty();
	$.each(data, function(index, d){
		$('#meter-usage-data-table tbody:last-child').append(
			'<tr><td>'+d['time']+'</td><td>'+d['meterusage']+'</td></tr>'
		);
		toggle_loader();
	});
}

// to show Info notification.
function show_info(){
	$('.info-container').empty();
	$('.info-container').append(
		$(".info-object-container").html()
	)
}

// to show Error notification.
function show_error(code, err){
	$('.info-container').empty();
	$('.info-container').append(
		$(".error-object-container").html()
	)
	$(".info-container .error-code").html(
		"&nbsp;Error! Server responded with: `"+err+"`, Status: `"+code+"`"
	);
}

// to show/hide loader during XHR.
function toggle_loader(){
	$( "#ico-downloading" ).toggleClass('hidden');	
	$( "#ico-loading" ).toggleClass('hidden');	
}