<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
  <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
      <title>MemoGram</title>
      <meta name="description" content="">
      <meta name="keywords" content="">
      <meta name="viewport" content="width=device-width">

      <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
      <link href='http://fonts.googleapis.com/css?family=Arbutus+Slab|Ubuntu:400,700,400italic,700italic' rel='stylesheet' type='text/css'>

      <link rel="stylesheet" href="./css/reset.css">
      <link rel="stylesheet" href="./css/memogram/stylesheets/styles.css">
  </head>
  <body class="setup">


  <section>
  
    <header>
      <h1>MemoGram</h1>
    </header>
    
    <div id="memory-game">
      <form id="game-settings" action="<?php print $PHP_SELF; ?>" method="post">
        <div> 
          <!--<div class="form-item form-select form-num-tiles">
            <label for="num_tiles">Number of Tiles</label>
            <select name="num_tiles" id="num_tiles">
              <option value="6">6</option>
              <option value="8" selected="selected">8</option>
              <option value="10">10</option>
              <option value="12">12</option>
              <option value="14">14</option>
            </select>
          </div> -->
          <div class="form-item form-select form-subject">
            <label for="subject">Subject</label>
            <input type="text" maxlength="30" size="20" name="subject" id="subject" />
          </div>
          <div class="form-item form-submit">
            <input type="submit" value="Start Game" />
          </div>
        </div>
      </form>
      <div class="tiles">
      </div>
    </div>
  
  </section>        
  
  <!-- js begin -->
  <script type="text/javascript" src="./js/jquery-1.8.2.min.js"></script>
  <script type="text/javascript" src="./js/jquery.easing.1.3.js"></script>
  <script type="text/javascript" src="./js/memogram.js"></script>
  <!-- js end -->

    </body>
</html>