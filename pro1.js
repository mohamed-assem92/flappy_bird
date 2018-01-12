// ##### the global variables #####
var img = document.getElementById('bird1');
var character = document.getElementsByClassName('character');
var playbutton = document.getElementById('startplay');
var startpage = document.getElementById('startpage');
var gamepage = document.getElementById('gamepage');
var endpage = document.getElementById('endpage');
var playername = document.getElementById('playername1');
var displayname = document.getElementById('displayname');
var displaylives1 = document.getElementById('displaylives1');
var displaylives = document.getElementById('displaylives');
var endgame = document.getElementById('endgame');
var score = document.getElementById('score');
var showscore = document.getElementById('showscore');
var playagainbtn = document.getElementById('playagain');
var obsimage = document.getElementById('obsimage');
var imagesarray = ["images/obs2.png","images/obs1.png"];
var heightarray = ["70","90","110","130","150","170","190","210,230,300"];
var level = document.getElementById("level")
var choosebtn = document.getElementById("choose")
var levelsimg = document.getElementById("levels")
var showlevel = document.getElementById("showlevel")
var level_1_btn = document.getElementById("choose1")
var level_2_btn = document.getElementById("choose2")
var level_3_btn = document.getElementById("choose3")


img.width = 80;
img.height = 60;
var birdwings = [];
var count = 0;
var keepjump = 'true';
var crash = 'false';

//##### the bird class #####
 var bird = function() {
   this.pos_y = 20;
   this.pos_x = 20;
   this.player_name;
   this.lives = 3;
   this.scoree = 0;
   window.addEventListener('keyup', function(event) {
     if (event.keyCode === 32 && this.pos_y > 50 && keepjump === 'true') {
       this.pos_y -= 35;
       img.style.top= this.pos_y +'px';
     }
   }.bind(this))
 }
 bird.prototype.setplayername = function (pname) {
   this.player_name = pname;
 };
 bird.prototype.getplayername = function () {
   return this.player_name;
 };
 bird.prototype.decreaselives = function () {
   this.lives--;
 };
 bird.prototype.getlives = function () {
   return this.lives;
 };
 bird.prototype.getbirdposy = function () {
   return this.pos_y;
 };
 bird.prototype.getbirdposx = function () {
   return this.pos_x;
 };
 bird.prototype.setscore = function () {
   this.scoree += 2;
   score.innerHTML = `Score: ${this.scoree}`;
 };
 bird.prototype.getscore = function () {
   return this.scoree;
 };
 bird.prototype.printscore = function () {
   score.innerHTML = `Score: ${this.scoree}`;
   scoreint = setInterval(this.setscore.bind(this),3000);
 };
 bird.prototype.wingmove = function () {

  wingmov = setInterval(this.changeimg,90);

 };
bird.prototype.gravity = function () {
    grav = setInterval(this.set_y.bind(this), 90);
};
bird.prototype.changeimg = function () {
  img.src = birdwings[count++];
  if (count === 4) {
    count = 0;
  }
};
bird.prototype.crash = function () {
  if (parseInt(getComputedStyle(obsimage).left)-50 <= this.pos_x) {
    if (this.pos_y+20 >= parseInt(getComputedStyle(obsimage).top)) {
      this.pos_y = 20;
      this.lives--;
      displaylives1.innerHTML = ` x${this.lives}`;
      this.whencrash();
    }
  }
};
bird.prototype.whencrash = function () {
  clearInterval(grav);
  clearInterval(wingmov);
  clearInterval(scoreint);
  img.src = "images/5.png"
  setTimeout(function() {
    img.src = birdwings;
    this.wingmove();
    this.gravity();
    this.printscore();
  }.bind(this), 1000)
};
bird.prototype.set_y = function () {
  this.pos_y += 7
  img.style.top= this.pos_y +"px";
  displaylives.src = birdwings[0];
  displaylives1.innerHTML = ` x${this.lives}`;
  this.crash();
  if (this.pos_y > 500 && this.lives > 0) {
    this.pos_y = 20;
    this.lives--;
    displaylives1.innerHTML = ` x${this.lives}`;
    this.whencrash();
  }
  if (this.lives === 0) {
    clearInterval(grav);
    clearInterval(wingmov);
    clearInterval(scoreint);
    startpage.style.display = 'none';
    gamepage.style.display = 'none';
    endgame.src = "images/Replay.png";
    endpage.style.display = 'block';
    showscore.innerHTML = `${this.player_name} Your Final Score Is: ${this.scoree}`
  }
};


playbutton.addEventListener("click", function() {
  images();
  startpage.style.display = 'none';
  gamepage.style.display = 'block';
  gameloop();
})
/////imgaes/////////////////
function images() {
    if (character[0].checked === true) {
        birdwings = ["images/1.png","images/2.png","images/3.png","images/4.png"];
    }
    if (character[1].checked === true) {
        birdwings = ["images/11.png","images/22.png","images/33.png","images/44.png"];
    }
    if (character[0].checked === false && character[1].checked === false) {
        birdwings = ["images/111.png","images/222.png","images/333.png","images/444.png"];
    }
}

////////////////////levels////////////
    showlevel.addEventListener("click", function() {
    startpage.style.display = 'none';
    level.style.display = 'block';ء
})

level_1_btn.addEventListener("click" , function () {
    images();
    level.style.display = 'none';
    gamepage.style.backgroundImage = "url('images/12.png')";
    gamepage.style.display = 'block';
    gameloop();

});

level_2_btn.addEventListener("click" , function () {
    images();
    level.style.display = 'none';
    gamepage.style.backgroundImage = "url('images/2.jpg')";
    gamepage.style.display = 'block';
    gameloop();

});

level_3_btn.addEventListener("click" , function () {
    images();
    level.style.display = 'none';
    gamepage.style.backgroundImage = "url('images/3.jpg')";
    gamepage.style.display = 'block';
    gameloop();

});


//###### the game loop ######
function gameloop() {
  var b1 = new bird;
  var obs = new obstacles;
  obs.obsmove();

  ////
    if(b1.scoree === 4)
    {
        gamepage.style.backgroundImage = "url('images/12.png')";
    }

  b1.setplayername(playername.value);
  var printname = b1.getplayername();
  displayname.innerHTML = `Player: ${printname}`;

  b1.wingmove();
  b1.gravity();
  //b1.birdjump();
  b1.printscore();
  const Env = new Environment()
  Env.movesky();
  playagain.addEventListener("click", function() {
    b1.scoree = 0;
    b1.pos_y = 20;
    b1.lives = 3;
    b1.wingmove();
    b1.gravity();
    b1.printscore();
    startpage.style.display = 'none';
    gamepage.style.display = 'block';
    endpage.style.display = 'none';
  })
}
////////////fff////////score



//######## the obstacles class and proto types ########
obsimage.src = imagesarray[Math.floor(Math.random() * imagesarray.length)];
obsimage.height = heightarray[Math.floor(Math.random() * heightarray.length)];

var obstacles = function() {
  this.posx = -50;
  this.posy = 0;
}
obstacles.prototype.setposx = function () {
  this.posx += 5;
  obsimage.style.right = this.posx +"px";
  if (this.posx >= 800) {
    this.posx = -50;
    setTimeout(function() {
      obsimage.src = imagesarray[Math.floor(Math.random() * imagesarray.length)];
      obsimage.height = heightarray[Math.floor(Math.random() * heightarray.length)];
    },100)
  }
};
obstacles.prototype.getposx = function () {
  return this.posx;
};
obstacles.prototype.setposy = function (nuum) {
  this.posy = nuum;
};
obstacles.prototype.getposy = function () {
  return this.posy;
};
obstacles.prototype.obsmove = function () {
  moveleft = setInterval(this.setposx.bind(this), 50);
};
///////////environment
const  Environment = function () {
    this.currentpos = 0 ;
};
Environment.prototype.moveground = function()
{
    this.currentpos -= 2 ;
    gamepage.style.backgroundPositionX =  this.currentpos + "px"

};
Environment.prototype.movesky = function () {
    var i = setInterval(this.moveground.bind(this) ,50)

};


function loadingpage() {
  var bar = document.getElementById('progress-bar')
  var prog = document.getElementById('progress');
  var progress = 25;
  loadinginterval = setInterval(function() {
    if (progress === 500) {
      clearInterval(loadinginterval);
      bar.style.display = "none"
      startpage.style.display = "block"
    }
    else {
      progress += 5;
      prog.style.width = progress + 'px';
    }
  },10)
}

loadingpage();
