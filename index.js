var tiles;
var score;
var container;

function reset_game() {
  for(var i=0; i<4; i++) {
    for(var j = 0; j<4; j++) {
      if(tiles[i][j].html!="") {
        tiles[i][j].html.remove();
      }
    }
  }
}

function init_game() {
  tiles = [[], [], [], []];
  score = 0;
  $('.score-digit').text(score);
  container = $('.response');
  container.css("display", "none");
}

class tile {
  constructor(i, j) {
    this.width = 6.5;
    this.height = 6.5;
    this.value = 0;
    this.x = i;
    this.y = j;
    this.html = "";
  }

  update() {
    if(this.html!="") {this.html.remove();
    this.generate();}
  }

  generate() {
    $('.game').append("<div class = 'tile temp'></div>");
    this.html = $('.temp');
    this.html.removeClass('temp');
    switch (this.value) {
      case 0:
        break;
      case 3:
        this.html.addClass('three');
        this.html.prepend("3");
        break;
      case 6:
        this.html.addClass('six');
        this.html.prepend("6");
        break;
      case 12:
        this.html.addClass('one-two');
        this.html.prepend("12");
        break;
      case 24:
        this.html.addClass('two-four');
        this.html.prepend("24");
        break;
      case 48:
        this.html.addClass('four-eight');
        this.html.prepend("48");
        break;
      case 96:
        this.html.addClass('nine-six');
        this.html.prepend("96");
        break;
      case 192:
        this.html.addClass('one-nine-two');
        this.html.prepend("192");
        break;
      case 384:
        this.html.addClass('three-eight-four');
        this.html.prepend("384");
        break;
      case 768:
        this.html.addClass('seven-six-eight');
        this.html.prepend("768");
        break;
      case 1536:
        this.html.addClass('one-five-three-six');
        this.html.prepend("1536");
        break;
      case 3072:
        this.html.addClass('three-zero-seven-two');
        this.html.prepend("3072");
        break;
    }
    this.html.css("bottom", (3-this.x)*7.5-0.4+"rem");
    this.html.css("left", this.y*7.5+"rem");
  }
}

function start_game() {
  init_tiles();
  create_tile();
  create_tile();
}

function init_tiles() {
  for(var i=0; i<4; i++) {
    for(var j=0; j<4; j++) {
      tiles[i][j] = new tile(i, j);
    }
  }
}

function create_tile() {
  var duplicate = true;
  var x, y;
  while(duplicate){
    x = Math.floor(Math.random()*4);
    y = Math.floor(Math.random()*4);
    if(tiles[x][y].value == 0) {duplicate = false;}
  }
  var val = Math.random();
  if(val<0.85) { val = 3; }
  else { val = 6; }
  tiles[x][y].value = val;
  tiles[x][y].generate();

}

function move_right() {
  var new_tile = false;
  var new_set = tiles;
  var i = 3, j = 2;
  var rem_tiles = [];
  var rem_count = 0;
  var update_tiles = [];
  var up_count = 0;
  while(i>-1){
    j=2;
    while(j>-1) {
      if(new_set[i][j].value>0) {
        while(j<3) {
          if(new_set[i][j+1].value==0) {
            var temp = new_set[i][j+1];
            new_set[i][j+1] = new_set[i][j];
            new_set[i][j] = temp;
            new_set[i][j].y = j;
            new_set[i][j+1].y = j+1;
            j+=1;
            new_tile = true;
          }
          else if (new_set[i][j+1].value == new_set[i][j].value) {
            rem_tiles[rem_count] = new_set[i][j+1];
            rem_count++;
            update_tiles[up_count] = [i, j+1];
            up_count++;
            new_set[i][j+1] = new_set[i][j];
            new_set[i][j+1].value*=2;
            score+=new_set[i][j+1].value;
            new_set[i][j] = new tile(i, j);
            new_set[i][j].y = j;
            new_set[i][j+1].y = j+1;
            new_tile = true;
            break;
          }
          else {break;}
        }
      }
      j--;
    }
    i--;
  }
  for(i=0; i<4; i++) {
    for(j=0; j<4; j++) {
      var temp = new_set[i][j];
      if(temp.value>0) {
        temp.html.animate({left: j*7.5+"rem"}, 100);
      }
    }
  }
  setTimeout(function() {
    for(i=0; i<rem_count; i++) {
      rem_tiles[i].html.remove();
      delete rem_tiles[i];
    }
  }, 50);
  setTimeout(function() {
    for(i=0; i<up_count; i++) {
      new_set[update_tiles[i][0]][update_tiles[i][1]].update();
    }
    $('.score-digit').text(score);
  }, 100);
  tiles = new_set;
  return new_tile;
}

function move_left() {
  var new_tile = false;
  var new_set = tiles;
  var i = 0, j = 1;
  var rem_tiles = [];
  var rem_count = 0;
  var update_tiles = [];
  var up_count = 0;
  while(i<4){
    j=1;
    while(j<4) {
      if(new_set[i][j].value>0) {
        while(j>0) {
          if(new_set[i][j-1].value==0) {
            var temp = new_set[i][j-1];
            new_set[i][j-1] = new_set[i][j];
            new_set[i][j] = temp;
            new_set[i][j].y = j;
            new_set[i][j-1].y = j-1;
            j--;
            new_tile = true;
          }
          else if (new_set[i][j-1].value == new_set[i][j].value) {
            rem_tiles[rem_count] = new_set[i][j-1];
            rem_count++;
            update_tiles[up_count] = [i, j-1];
            up_count++;
            new_set[i][j-1] = new_set[i][j];
            new_set[i][j-1].value*=2;
            score+=new_set[i][j-1].value;
            new_set[i][j] = new tile(i, j);
            new_set[i][j].y = j;
            new_set[i][j-1].y = j-1;
            new_tile = true;
            break;
          }
          else {break;}
        }
      }
      j++;
    }
    i++;
  }
  for(i=0; i<4; i++) {
    for(j=0; j<4; j++) {
      var temp = new_set[i][j];
      if(temp.value>0) {
        temp.html.animate({left: j*7.5+"rem"}, 100);
      }
    }
  }
  setTimeout(function() {
    for(i=0; i<rem_count; i++) {
      rem_tiles[i].html.remove();
      delete rem_tiles[i];
    }
  }, 50);
  setTimeout(function() {
    for(i=0; i<up_count; i++) {
      new_set[update_tiles[i][0]][update_tiles[i][1]].update();
    }
    $('.score-digit').text(score);
  }, 100);
  tiles = new_set;
  return new_tile;
}

function move_up() {
  var new_tile = false;
  var new_set = tiles;
  var i = 1, j = 0;
  var rem_tiles = [];
  var rem_count = 0;
  var update_tiles = [];
  var up_count = 0;
  while(j<4) {
    i=1;
    while(i<4) {
      if(new_set[i][j].value>0) {
        while(i>0) {
          if(new_set[i-1][j].value==0) {
            var temp = new_set[i-1][j];
            new_set[i-1][j] = new_set[i][j];
            new_set[i][j] = temp;
            new_set[i][j].x = i;
            new_set[i-1][j].x = i-1;
            i--;
            new_tile = true;
          }
          else if (new_set[i-1][j].value == new_set[i][j].value) {
            rem_tiles[rem_count] = new_set[i-1][j];
            rem_count++;
            update_tiles[up_count] = [i-1, j];
            up_count++;
            new_set[i-1][j] = new_set[i][j];
            new_set[i-1][j].value*=2;
            score+=new_set[i-1][j].value;
            new_set[i][j] = new tile(i, j);
            new_set[i][j].x = i;
            new_set[i-1][j].x = i-1;
            new_tile = true;
            break;
          }
          else {break;}
        }
      }
      i++;
    }
    j++;
  }
  for(i=0; i<4; i++) {
    for(j=0; j<4; j++) {
      var temp = new_set[i][j];
      if(temp.value>0) {
        temp.html.animate({top: i*7.5+"rem"}, 100);
      }
    }
  }
  setTimeout(function() {
    for(i=0; i<rem_count; i++) {
      rem_tiles[i].html.remove();
      delete rem_tiles[i];
    }
  }, 50);
  setTimeout(function() {
    for(i=0; i<up_count; i++) {
      new_set[update_tiles[i][0]][update_tiles[i][1]].update();
    }
    $('.score-digit').text(score);
  }, 100);
  tiles = new_set;
  return new_tile;
}

function move_down() {
  var new_tile = false;
  var new_set = tiles;
  var i = 2, j = 0;
  var rem_tiles = [];
  var rem_count = 0;
  var update_tiles = [];
  var up_count = 0;
  while(j<4) {
    i=2;
    while(i>-1) {
      if(new_set[i][j].value>0) {
        while(i<3) {
          if(new_set[i+1][j].value==0) {
            var temp = new_set[i+1][j];
            new_set[i+1][j] = new_set[i][j];
            new_set[i][j] = temp;
            new_set[i][j].x = i;
            new_set[i+1][j].x = i+1;
            i++;
            new_tile = true;
          }
          else if (new_set[i+1][j].value == new_set[i][j].value) {
            rem_tiles[rem_count] = new_set[i+1][j];
            rem_count++;
            update_tiles[up_count] = [i+1, j];
            up_count++;
            new_set[i+1][j] = new_set[i][j];
            new_set[i+1][j].value*=2;
            score+=new_set[i+1][j].value;
            new_set[i][j] = new tile(i, j);
            new_set[i][j].x = i;
            new_set[i+1][j].x = i+1;
            new_tile = true;
            break;
          }
          else {break;}
        }
      }
      i--;
    }
    j++;
  }
  for(i=0; i<4; i++) {
    for(j=0; j<4; j++) {
      var temp = new_set[i][j];
      if(temp.value>0) {
        temp.html.animate({top: i*7.5+"rem"}, 100);
      }
    }
  }
  setTimeout(function() {
    for(i=0; i<rem_count; i++) {
      rem_tiles[i].html.remove();
      delete rem_tiles[i];
    }
  }, 50);
  setTimeout(function() {
    for(i=0; i<up_count; i++) {
      new_set[update_tiles[i][0]][update_tiles[i][1]].update();
    }
    $('.score-digit').text(score);
  }, 100);
  tiles = new_set;
  return new_tile;
}

function check_game() {
  fill = true;
  tiles_to_merge = false;
  for (var i = 0; i<4; i++) {
    for (var j = 0; j<4; j++) {
      if(tiles[i][j].value == 3072) {
        return "win";
      }
      else if(tiles[i][j].value==0) {
        return "none";
      }
      else {
        if(j<3) {
          if(tiles[i][j+1].value == tiles[i][j].value) {
            return "none";
          }
        }
      }
    }
  }
  if(fill) {
    for (var j = 0; j<4; j++) {
      for (var i = 0; i<3; i++) {
          if(tiles[i+1][j].value == tiles[i][j].value) {
            return "none";
          }
      }
    }
  }
  return "lose";
}

function respond(status) {
  container.addClass(status);
  container.css("display", "block");
  if(status=="lose") {
    container.text("You Lose!");
  }
  else if(status=="win") {
    container.text("You Win!")
  }
}
$(document).ready( function() {
  init_game();
  start_game();
  console.log(container.html());
  $(".new-game-btn").on("click", function(event) {
    reset_game();
    init_game();
    start_game();
  });
  $(document).on("keydown", function(event) {
    event.preventDefault();
    if(event.which==39) {
      if(move_right()) {
        create_tile();
      }
    }
    if(event.which==37) {
      if(move_left()) {
      create_tile();
    }
    }
    if(event.which==38) {
      if(move_up()) {
      create_tile();
    }
    }
    if(event.which==40) {
      if(move_down()) {
      create_tile();
    }
    }
    stat = check_game();
    if(stat!="none") {respond(stat);}
  });
  var startX = 0, startY = 0, distX = 0, distY = 0, threshold = 20;
  $(".game").on("touchmove", function(e) {
    e.preventDefault();
  });
  $(".game").on("touchstart", function(e) {
    var touchobj = e.changedTouches[0];
    distX = distY = 0;
    startX = touchobj.pageX;
    startY = touchobj.pageY;
    e.preventDefault;
  });
  $(".game").on("touchend", function(e) {
    var touchobj = e.changedTouches[0];
    distX = touchobj.pageX - startX;
    distY = touchobj.pageY - startY;
    if(Math.abs(distY)<50) {
      if(distX>threshold) {
        move_right();
        create_tile();
      }
      else if(distX<-1*threshold) {
        move_left();
        create_tile();
      }
    }
    else if(distY>threshold) {
        move_down();
        create_tile();
      }
      else if(distY<-1*threshold) {
        move_up();
        create_tile();
      }
    }
    stat = check_game();
    if(stat!="none") {respond(stat);}
  });
  });
