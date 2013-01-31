var cl =  function(item) { console.log(item); }

$(document).ready(function(){
    
    var num = 8;
    var tag = 'cat';
    
    // YOU NEED TO ADD IN YOUR INSTAGRAM APP DETAILS HERE
    //client ID
     var ig_cid = '';
    //client SECRET
    var ig_csecret = '';
    //TOKEN - when you authenticate your app
    var ig_token = '';
    
    $('form#game-settings').submit(function(){
       $('.tiles span').remove();
       startGame(num, $('#subject').val());
       return false;
    });
    
    var throwError = function(msg) {
      console.log(msg);
    }
    
    var startGame = function(num, tag) {
        var ig_api_url = 'https://api.instagram.com/v1/tags/'+tag+'/media/recent?client_id='+ig_cid+'&access_token='+ig_token;
        
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            cache: false,
            url: ig_api_url,
            success: function(data) {
              var orig_images = new Array();
              if(data.data.length >  num) {
                  for(var k=0; k<num; k++) {
                    //cl('here');
                    //cl(data.data[k].images.standard_resolution.url);
                    orig_images[k] = data.data[k].images.standard_resolution.url;
                  }
                  doMagicGame(orig_images);
              } else {
                throwError('No Results found for subject');
              }
            }
        });
        
        var doMagicGame = function(orig_images){
              
          $('body').removeClass('setup').addClass('game');
          //get images
          //TODO - instagram API
          
          //determine size of grid and percentage width
          var gridsize = orig_images.length / 2;
          var pc = 100/gridsize;
          var tiles = $('.tiles');
          //duplicate and shuffle images
          var images = orig_images.concat(orig_images);
          images.sort(function() { return 0.5 - Math.random() });
          
          var clicked_num = 1;
          
          //loop through images and load
          var loaded_count = 1;
          for(var i=0; i<orig_images.length; i++) {
              $('<img/>')
                        .attr('src', orig_images[i])
                        .load(function() {
                            loaded_count++;
                            //all the images are loaded now, so that's cool...
                            if(loaded_count == orig_images.length) {
                                for(var j=0; j<images.length; j++) {
                                    tiles.append('<span class="tile" style="width:'+pc+'%"><img src="'+images[j]+'" /></span>');
                                }
                                resizeTileContainer();
                                $(".tiles span").not('.discovered, .clicked').bind('click', function(){
                                  cl('click');
                                  cl($(this));
                                  $(this).addClass('clicked match-'+clicked_num).find('img').animate({'top': 0}, 200);
                                  if($('.tile.match-'+clicked_num).length == 2) {
                                      var old_clicked_num = clicked_num;
                                      //check whether the images match
                                      var matched_src = new Array();
                                      $('.tile.match-'+old_clicked_num).each(function(e) {
                                        matched_src[e] = $(this).find('img').attr('src');
                                      });
                                      
                                      if(matched_src[0] == matched_src[1]) {
                                        $('.tile.match-'+old_clicked_num).removeClass('match-'+old_clicked_num, 'clicked', 'tile').addClass('discovered');
                                        //something here to check the end of the game and take appropriate action
                                      } else {
                                        //delay
                                        setTimeout(function(){
                                            $('.tile.match-'+old_clicked_num).removeClass('match-'+old_clicked_num).removeClass('clicked').find('img').animate({'top': '100%'}, 200);
                                        },1000);
                                      }
                                      
                                      //increase the clicked num anyways
                                      clicked_num++;
                                  }
                                    
                                });
                            }
                        })
                        .error(function(){ cl('unable to load img '+i+', src: '+orig_images[i]); })
          }
          
          
          var resizeTileContainer = function(){
            var wh = $(window).height();
            var th = $('.tiles').height();
            //set the tiles to the same height as the window
            $('.tiles').css({'width': wh+'px', 'height': wh+'px'});
            //if the window is too narrow, update the width
            var ww = $(window).width();
            var tw = $('.tiles').width();
            if(th > ww) {
              $('.tiles').css({'width': ww+'px', 'height': ww+'px'});
            }
            var tsw = $('.tiles span').width();
            $('.tiles span').css({'height': tsw+'px'});
            
          }
          resizeTileContainer();
          $(window).resize(function(){ resizeTileContainer(); });
        }
      
    }
});

