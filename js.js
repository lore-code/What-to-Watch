// JS goes here....

$( document ).ready(function() {
    console.log( "ready!" );
    

    $("#category").hide();


});


$(".types").click(function()
{
   

   console.log("something was clicked");
   $("#category").show();

   $("#type").hide();

   type=$(this).val();

   movieSearch();

});



var mykey = config.MY_KEY;
 
var page =  Math.floor(Math.random() * 500);

var type;


function movieSearch() {

$(".types").click(function(){
        type = $(this).val();
        
    }); 

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.themoviedb.org/3/discover/"+ type + "?api_key=" + mykey + "&page=" + page + "&language=en-US&certification_country=US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=18",
  "headers": {},
  "data": "{}"
  
}


$.ajax(settings).done(function (response) {


	var total = response.total_results;
	console.log(total);
  console.log(response);
  for (var i = 0; i < 9; i++) {

  		var y = Math.floor(Math.random() * 20);
  		console.log(y);
  	
  		var test = response.results[y];
  		console.log(test);

  		// var test1 = JSON.stringify(test);

  		var title;

      //select titles based on type

      if (type ==="movie") {

        title = test["original_title"];
      }

      else {

        title = test["name"];
      }

      var poster;

      if (test["poster_path"]===null) {

        poster = "https://static.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg"
      }

      else {

        poster = "https://image.tmdb.org/t/p/w154/"+test["poster_path"];
      }

      console.log(poster);
  		
  		$("#info").append(

      '<div class="col s12 m4 l4"><div class="card"><div class="card-image waves-effect waves-block waves-light">' + 
      '<img class="activator"' + 'src=' + poster + '></div>' + 
    '<div class="card-content"><span class="card-title activator grey-text text-darken-4">' + title + '<i class="material-icons right">more_vert</i></span></div><div class="card-reveal"><span class="card-title grey-text text-darken-4">' + title + '<i class="material-icons right">close</i></span><p>Here is some more information about this product that is only revealed once clicked on.</p></div></div>');
  	
  }
  



});


};

//genre of movie list
// genre/movie/list?language=en-US&api_key=5b71a5423ce9867b54b412be9e53e288"



//https://api.themoviedb.org/3/discover/function (a) {  $("button.types").on('click',function(){    type = "movie";  });}?api_key=5b71a5423ce9867b54b412be9e53e288&page=348&language=en-US&certification_country=US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=18&{}