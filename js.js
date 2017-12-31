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


  
   search();

})






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

var movieId;

var html;

var trailer;

var trailer1;


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

  url2 = url1 + "&page=" + page + "&language=en-US&certification_country=US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=28|12|80|"; 

}

if (genre == "scary") {

//genre = horror or mystery or thriller  

  url2 = url1 + "&page=" + page + "&language=en-US&certification_country=US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=27|9648|80|53"; 

}




var settings = {
  "async": true,
  "crossDomain": true,
  "url": url2,
  "headers": {},
  "data": "{}"
  
}


      


return $.ajax(settings).then(function (info) {

// $.ajax(settings,settings1)


  // console.log(total);
 //  console.log(response);

console.log(info);
 //random number using chance library gives me nine numbers between 0 and 19  
var y = chance.unique(chance.integer, 1, {min: 0, max: 19});



var info = info["results"][y];

console.log(y);



      
     //get results in to variable then get title, poster, plot, trailer
      
      movieId = info["id"];

      console.log(movieId);

      

    

    



});



};



function getCurrentTrailer() {



  return $.ajax("https://api.themoviedb.org/3/" + type + "/" + movieId + "?api_key=" + mykey + "&append_to_response=videos")
 
}


function search() {

  

  movieSearch().then(getCurrentTrailer)

  .then(function(info)  {


    console.log("this is the last bit: ");

   console.log(info);

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
      
      
      html = '<div class="col s12 m4 l4"><div class="card"><div class="card-image waves-effect waves-block waves-light">' + 
      '<img class="activator"' + 'src=' + poster + '></div><div class="card-content"><span class="card-title activator grey-text text-darken-4">' + title + '<p>' + date + '</p><i class="material-icons right">more_vert</i></span></div>'+'<div class="card-reveal"><span class="card-title grey-text text-darken-4">' + title + '<i class="material-icons right">close</i></span><p>Plot: ' + plot + '</p>'

               
                console.log(info.videos.results.length);

                var trailer3 = "https://www.youtube.com/results?search_query=" + encodeURIComponent(title + " HD Trailer");

                if(info.videos.results.length== 0){

                  trailer = "No video found";
                  trailer1= "No video found";
                  trailer2 = '<p>No Video Found</p><a href=' +  trailer3 + '>Search YouTube</a>';

                }

                else{
                   trailer = info.videos.results[0]["key"];
                trailer1 = "https://www.youtube.com/embed/" + encodeURI(trailer + '?rel=0&amp;controls=0');
                  var trailer2 = '<div class="video-container"><iframe width="560" height="315" src=' + trailer1 + 'frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe></div></div>';
                }
  
  console.log(trailer);
  console.log(trailer1);
     



$("#info").append(html+trailer2);
})



}



      
 


  









