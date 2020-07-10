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
		},
		error: function(err){
			console.log(err);
			toggle_loader();
			show_error();
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
	$('#meter-usage-data-table tbody').empty();
	$('#meter-usage-data-table tbody').append(
		'<tr><td colspan="2">'+$(".info-object-container").html()+'</td></tr>'
	)
	
}

// to show Error notification.
function show_error(){
	$('#meter-usage-data-table tbody').empty();
	$('#meter-usage-data-table tbody').append(
		'<tr><td colspan="2">'+$(".error-object-container").html()+'</td></tr>'
	)
}

// to show/hide loader during XHR.
function toggle_loader(){
	$( "#ico-downloading" ).toggleClass('hidden');	
	$( "#ico-loading" ).toggleClass('hidden');	
}