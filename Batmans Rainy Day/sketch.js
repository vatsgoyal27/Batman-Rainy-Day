
var streams = [];
var fadeInterval = 1.6;
var symbolSize = 14;
var lettherebelight;


function preload(){
  lightning = loadImage("light.jpg");
  cloudImg = loadImage("Cloud.jpg");

}

function setup() {
  createCanvas(
    window.innerWidth,
    window.innerHeight
  );
  background(0);
  cloud = createSprite(100, 60, 50 , 50);
  cloud.addImage("CloudImage",cloudImg);
  cloud2 = createSprite(352, 60, 50 , 50);
  cloud2.addImage("CloudImage",cloudImg);
  cloud3 = createSprite(604, 60, 50 , 50);
  cloud3.addImage("CloudImage",cloudImg);
  cloud4 = createSprite(856, 60, 50 , 50);
  cloud4.addImage("CloudImage",cloudImg);
  cloud5 = createSprite(1108, 60, 50 , 50);
  cloud5.addImage("CloudImage",cloudImg);
  light = createSprite(600, 600, 500 , 500);
  light.addImage("lethere", lightning);

  var x = 0;
  for (var i = 0; i <= width / symbolSize; i++) {
    var stream = new Stream();
    stream.generateSymbols(x, random(-2000, 0));
    streams.push(stream);
    x += symbolSize
  }

  textFont('Consolas');
  textSize(symbolSize);
}

function draw() {
  background(0, 150);
  streams.forEach(function(stream) {
    stream.render();
  });
  drawSprites();
  var lettherebelight = Math.floor(random(1, 15300));
  if(lettherebelight == 7650){
    for(var i = 0; i < 200; i++ ){
      light.x = 600;

    }
  }
  else{
    light.x = 60000;

  }
  console.log(lettherebelight);
}

function Symbol(x, y, speed, first, opacity) {
  this.x = x;
  this.y = y;
  this.value;

  this.speed = speed;
  this.first = first;
  this.opacity = opacity;

  this.switchInterval = round(random(2, 25));

//  this.setToRandomSymbol = function() {
 //   var charType = round(random(0, 5));
 //   if (frameCount % this.switchInterval == 0) {
 //     if (charType > 1) {
 //       // set it to Katakana
 //       this.value = String.fromCharCode(
 //         0x30A0 + floor(random(0, 97))
 //       );
  //    } else {
  //      // set it to numeric
 //       this.value = floor(random(0,10));
 //     }
 //   }
 // }

  this.rain = function() {
    this.y = (this.y >= height) ? 0 : this.y += this.speed;
  }
  

}

function Stream() {
  this.symbols = [];
  this.totalSymbols = round(random(1, 5));
  this.speed = random(5, 15);

  this.generateSymbols = function(x, y) {
    var opacity = 255;
    var first = round(random(0, 4)) == 1;
    for (var i =0; i <= this.totalSymbols; i++) {
      symbol = new Symbol(
        x,
        y,
        this.speed,
        first,
        opacity
      );
   //   symbol.setToRandomSymbol();
      this.symbols.push(symbol);
      opacity -= (255 / this.totalSymbols) / fadeInterval;
      y -= symbolSize;
      first = false;
    }
  }

  this.render = function() {
    this.symbols.forEach(function(symbol) {
      if (symbol.first) {
        fill(0, 0, 205, symbol.opacity);
      } else {
        fill(0, 0, 205, symbol.opacity);
      }
      text("o", symbol.x, symbol.y);
      symbol.rain();
   //   symbol.setToRandomSymbol();
    });
  }
}