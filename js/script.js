	//use opensearch too? 
$(document).ready(function() {
	
	var input; 
	var url = 'https://en.wikipedia.org/w/api.php?';
	var wikiLink = 'https://en.wikipedia.org/wiki/';
	var newDiv; 
	 

	function removeSpaces(rawTitle){
  		return rawTitle.replace(/ /g, "_"); 
}



$('button').on('click', function(){
	$('.resultsDiv').remove(); 
	input = $('input').val(); 
	console.log(input); 

	$.ajax(url, {
		success: function(response) {
			
			let resultArr = response.query.search; 
			$.each(resultArr, function(index, result){

				let title = result.title;
				let snippet = result.snippet;
				let linkTitle = removeSpaces(title);
				let link = wikiLink.concat(linkTitle); 
				console.log("Link " + link); 
				console.log(typeof(link)); 
				
				newDiv = $(
				"<div class ='resultsDiv'>" +
					"<p>" + title + "</p>" + 
			 		snippet + "<br>" +
			 		'<a href="' + link + '" target="_blank">Open Here</a>' + 
			 		/*"<a href = 'https://en.wikipedia.org/wiki/?' target='_blank'>" + "<br>" +
			 		"some text" + "</a>" +*/
			  	"</div>");
				$("#output").append(newDiv); 

			})
			


		}, 
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

}); //docready



