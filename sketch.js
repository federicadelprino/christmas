var mic;
var fft;
var forest = [];
var lastTime= 0

var snow = [];

var gifts;

function preload() {
  gifts = loadImage('assets/gifts.png');
}



function setup() {
    createCanvas(windowWidth, windowHeight);
    mic = new p5.AudioIn();
    mic.start();
    fft = new p5.FFT();
    fft.setInput(mic);
    frameRate(30)
    
    for (var i=0; i<50; i++) {
    snow.push(new Snow());
        
        noStroke()
    }
        
     
}

function draw() {
    background(20)
    
    
    triangle(width/2, height/2, width/2, height/2, width/2, height/2);
    
    var updateEvery= random(200);
    var currentTime = millis();
    
        for (var i=0; i<forest.length; i++) {
            push()
            noStroke()
            fill(255,200)
        forest[i].display();
        forest[i].move();
            pop()
    }
    
     if(currentTime-lastTime>updateEvery && random()<0.3 ){
         update()
         lastTime=currentTime
     }
  
   
   volu = mic.getLevel();
    text(volu, 20, 20)
    
   myY = (height/2)-(map(volu, 0, 1, 0, windowHeight))
   text(myY,20,50)
    
    
     var fat = 25;
    push();
    fill(255,0,0);
    ellipse(width/4, myY , fat, fat);
    ellipse(width/4*2, myY , fat, fat);
    ellipse(width/4*3,myY , fat, fat);
    ellipse(width/5*2, myY/2 , fat, fat);
    ellipse(width/5*3,myY/2 , fat, fat);

    pop();
    
            for (var i=0; i<snow.length; i++) {
                push()
                noStroke()
                fill(255,random(200))
            snow[i].move();
            snow[i].display();

                pop()
          }
         
    }

function Snow() {
  this.x = random(width);
  this.y = random(height);
  this.diameter = random(1, 20);
  this.speed = 3;

  this.move = function() {
    this.x = this.x + (random(-2))
    this.y = this.y - random(-this.speed);
    
      if(this.y>height){
          this.y = 0
      }
      if(this.x<0){
          this.x = width + 20
      }
  };

  this.display = function() {
    ellipse(this.x, this.y, this.diameter, this.diameter);
  };
}


function gift() {
  this.x = width+20;
  this.y = height/2;
  
  this.speed = volu;

  this.move = function() {
    this.x = this.x-this.speed
  };

  this.display = function() {
      
    image(gifts, this.x-1000, this.y, this.size*2, this.size*2);
    
  };

}

function update(){
    forest.push(new gift());
}