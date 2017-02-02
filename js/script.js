"use strict";
$(document).ready(function() {
	
	var input, newDiv, url = 'https://en.wikipedia.org/w/api.php?', wikiLink = 'https://en.wikipedia.org/wiki/';

	function removeSpaces(rawTitle) {
  		return rawTitle.replace(/ /g, "_"); 
	}
	
	$('#searchBox').focus(); 
	
	$('input').on('keyup', function(event) {
		if (event.which == 13) {
			$('#search').click(); 
		}
	});
	
	$('#search').on('click', function() {
		$('.resultsDiv').remove(); 
		input = $('input').val(); 
		// console.log(input); 

		$.ajax(url, {
			success: function(response) {
				
				let resultArr = response.query.search; 
				$.each(resultArr, function(index, result) {

					let title = result.title;
					let snippet = result.snippet;
					let linkTitle = removeSpaces(title);
					let link = wikiLink.concat(linkTitle); 
					// console.log("Link " + link); 
					// console.log(typeof(link)); 
					
					newDiv = $(
					"<div class ='resultsDiv'>" +
						"<h2>" + title + "</h2>" + 
				 		"<p>" + snippet + " ..." + "</p>" +
				 		'<a href="' + link + '" target="_blank">' + link + '</a>' + 
				  	"</div>");
					$("#output").hide().append(newDiv); 

				})
				$("#output").fadeIn(400);
				$('input').val(" ");

			}, //success
			
	    dataType: 'json', 
	    data: {
	      action: 'query', 
	      format: 'json',
	      list: 'search',
	      origin: "*",
	      srwhat: 'text',
	      srnamespace: 0,
	      srsearch: input
	    }
		
		} // settings
		); //ajax params

	}); //button click

	$('#random').on('click', function() {
	window.open("https://en.wikipedia.org/wiki/Special:Random");

	});

}); //docready



