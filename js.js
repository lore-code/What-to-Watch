// JS goes here....

$( document ).ready(function() {
    console.log( "ready!" );
    

    $("#categories").hide();


});


$(".types").click(function()
{
   

   console.log("something was clicked");
   $("#categories").show();

   $("#type").hide();

   type=$(this).val();

   

});

$(".cat").click(function()
{
   

   console.log("something else was clicked");
   $("#categories").hide();

   $("#type").hide();

   genre=$(this).val();

   movieSearch();


});




var mykey = '5b71a5423ce9867b54b412be9e53e288';


//get the first 50 pages
var page =  Math.floor(Math.random() * 50);

var type;

var genre;

var genre1;

var url1;

var url2;

var year_start;

var year_end;



function movieSearch() {

  //when movie or tv clicked get value 

$(".types").click(function(){
        type = $(this).val();
        
    }); 

//url1 is url with type and key

year_start = "2015-01-01";

year_end = "2018-12-31";


if (type == "movie"){

  url1 = "https://api.themoviedb.org/3/discover/"+ type + "?api_key=" + mykey + "&primary_release_date.gte=" + year_start + "&primary_release_date.lte=" + year_end;
}

if (type =="tv"){
  url1 = "https://api.themoviedb.org/3/discover/"+ type + "?api_key=" + mykey + "&first_air_date.gte=" + year_start + "&first_air_date.lte=" + year_end;
}



//get category value;

$(".cat").click(function(){
        genre = $(this).val();
        
    }); 


//genre will give what genre to search for 
if (genre =="random") {

  //random genres

  url2 = url1 + "&page=" + page + "&language=en-US&certification_country=US&sort_by=popularity.desc&include_adult=false&include_video=false";
}

if (genre == "drama") {

//genre = drama or history or family or romance

  url2 = url1 + "&page=" + page + "&language=en-US&certification_country=US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=18|36|10751|10749";
}

if (genre == "comedy") {

//genre = drama or history or family or romance

  url2 = url1 + "&page=" + page + "&language=en-US&certification_country=US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=35"; 

}

if (genre == "action") {

//genre = action or adventure or crime 

  url2 = url1 + "&page=" + page + "&language=en-US&certification_country=US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=28| 12|80|"; 

}

if (genre == "scary") {

//genre = horror or mystery or thriller  

  url2 = url1 + "&page=" + page + "&language=en-US&certification_country=US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=27| 9648|80|53"; 

}




var settings = {
  "async": true,
  "crossDomain": true,
  "url": url2,
  "headers": {},
  "data": "{}"
  
}


      


$.ajax(settings).done(function (response) {

// $.ajax(settings,settings1)


	var total = response.total_results;
	// console.log(total);
 //  console.log(response);

 //random number using chance library gives me nine numbers between 0 and 19  
var y = chance.unique(chance.integer, 9, {min: 0, max: 19});

  
//do this nine times 
  for (var i = 0; i < 9; i++) {

  		

  	 //get results in to variable then get title, poster, plot, trailer
  		var info = response.results[y[i]];
  		console.log(info);

  		// var test1 = JSON.stringify(test);

  		var title;
      var date;

      //select titles based on type

      if (type ==="movie") {

        title = info["original_title"];
        date = info["release_date"].slice(0,4);

      }

      else {

        title = info["name"];
        date = info["first_air_date"].slice(0,4);
      }


      var poster;

      if (info["poster_path"]===null) {

        poster = "https://static.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg"
      }

      else {

        poster = "https://image.tmdb.org/t/p/w154/"+info["poster_path"];
      }

      // console.log(poster);

      var plot = info["overview"];
  		
  		
       
            var trailer = "https://www.youtube.com/results?search_query=" + encodeURIComponent(title + " HD Trailer");
     



          // console.log(trailer);

      // 

      // console.log(date);
        
       
         $("#info").append(

      '<div class="col s12 m4 l4"><div class="card"><div class="card-image waves-effect waves-block waves-light">' + 
      '<img class="activator"' + 'src=' + poster + '></div><div class="card-content"><span class="card-title activator grey-text text-darken-4">' + title + '<p>' + date + '</p><i class="material-icons right">more_vert</i></span></div><'+'div class="card-reveal"><span class="card-title grey-text text-darken-4">' + title + '<i class="material-icons right">close</i></span><p>Plot: ' + plot + '</p><p><a href=' + trailer + '><i class="material-icons large">videocam</i></a></p></div>');

       
       
    

  }


  



});


};





