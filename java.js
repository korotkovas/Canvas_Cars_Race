
$(function(){
  let cc=prompt('Car quantity?');
  cc=parseInt(cc);
  if (cc>0) {
    rd=prompt('Race distance?');
    if (rd>0) {
      for (let i = 0; i < cc; i++) {
        allCars.push(new Car(i,i));
      }
      speedChange();
      riid=setInterval(race,500);
      siid=setInterval(speedChange,2000);
    }else {
      alert('Bad distance');
    }

  }else {
    alert('Bad quantity');
  }

});

function Car(name,lane){
  this.name=name;
  this.lane=lane;
  this.speed=0;
  this.distance=0;
  console.log(this);
  this.cardiv=$("<div style='top:0px;position:absolute;left:" + this.lane*25 + "px;width:20px;height:20px; border-style: solid;border-width: 5px; background-color:red;'></div>");
  this.cardiv.appendTo(document.body);
}

// car functions
// speed up
Car.prototype.speedup=function(s){
  this.speed+=s;
  if (this.speed>150) {
    this.speed=150;
  }
}

// slowdown
Car.prototype.slowdown=function(s){
  this.speed-=s;
  if (this.speed<0) {
    this.speed=0;
  }
}

// ride
// t-time
Car.prototype.move=function(t){  //distance
  this.distance+=this.speed*t;
  
  this.cardiv.css('top',Math.round(this.distance));
}

// lane

// prompts
let riid;
let siid;
let rd;
let allCars=[]; //set interval
let lane=[];


// speed change

function speedChange(){
  for (let i = 0; i < allCars.length; i++) {
    if (Math.random()>=0.5) {
      allCars[i].speedup(
      Math.round(Math.random()*5));
    }else {
      allCars[i].slowdown(
        Math.round(Math.random()*5));
    }
  }
}


// ride
function race(){
  let winner=-1;
  for (let i = 0; i < allCars.length; i++) {
    allCars[i].move(0.5);
    if (allCars[i].distance>=rd) {
      winner=i;
      break;
    }
  }
  if (winner>=0) {
    clearInterval(riid);
    clearInterval(siid);
    console.log('winner : ' +  winner);
  }
  for (let i = 0; i < allCars.length; i++) {
    console.log('Car : ' + allCars[i].name+' ' + 'Speed : ' + allCars[i].speed+' ' + 'Distance : ' + allCars[i].distance + 'km');
  }
}
