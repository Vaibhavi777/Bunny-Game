const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
function preload()
{
  bg=loadImage("background.png")
  rabbit=loadImage("Rabbit-01.png")
  food=loadImage("melon.png")
  blink=loadAnimation("blink_1.png","blink_2.png","blink_3.png")
  eat=loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png")
  sad=loadAnimation("sad_1.png","sad_2.png","sad_3.png")
  eat.looping=false
  sad.looping=false
  air=loadSound("air.wav")
  cut=loadSound("rope_cut.mp3")
  cry=loadSound("sad.wav")
  eating=loadSound("eating_sound.mp3")
  bgSound=loadSound("sound1.mp3")
}

function setup() 
{
 var isMobile=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
 if(isMobile){
  w=displayWidth
  h=displayHeight
  createCanvas(w,h)
 }
 else{
  w=windowWidth
  h=windowHeight
  createCanvas(w,h)
 }

  bgSound.play()
  bgSound.setVolume(0.5)

  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,590,600,20);
  rope=new Rope(10,{x:300,y:60})

  rope2=new Rope(3,{x:width/2+20,y:30})

  rope3=new Rope(7,{x: width/2+220,y:50})
  fruit=Bodies.circle(300,300,15,{density:0.001})
  Composite.add(rope.body,fruit)

  link=new Link(rope,fruit)

  link2=new Link(rope2,fruit)

  link3=new Link(rope3,fruit)

  blink.frameDelay=30
  eat.frameDelay=30
  sad.frameDelay=30
  bunny=createSprite(200,520,100,100)
  bunny.addAnimation("blink",blink)
  bunny.addAnimation("sad",sad)
  bunny.addAnimation("eat",eat)
  bunny.scale=0.2

  button=createImg("cut_btn.png")
  button.position(280,60)
  button.size(50,50)
  button.mouseClicked(drop)

  button2=createImg("cut_btn.png")
  button2.position(width/2,30)
  button2.size(50,50)
  button2.mouseClicked(drop2)

  button3=createImg("cut_btn.png")
  button3.position(width/2+200,50)
  button3.size(50,50)
  button3.mouseClicked(drop3)
  
  blower=createImg("balloon.png")
  blower.position(10,250)
  blower.size(150,100)
  blower.mouseClicked(airBlow)

  mute=createImg("mute.png")
  mute.position(width-150,20)
  mute.size(50,50)
  mute.mouseClicked(mutebg)


  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(bg);
  ground.show();
  rope.show()
  rope2.show()
  rope3.show()
  Engine.update(engine);
  imageMode (CENTER)
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,60,60)
  }


  if(collide(fruit,bunny,80)==true){
    eating.play()
    bunny.changeAnimation("eat")
    World.remove(world,fruit)
    fruit=null
  }
  if(fruit!=null&&fruit.position.y>=550){
    cry.play()
    bunny.changeAnimation("sad")
    bgSound.stop()
    fruit=null
  }
  drawSprites()
   
}
function drop(){
  cut.play()
  rope.break()
  link.break()
  link=null
}

function drop2(){
  cut.play()
  rope2.break()
  link2.break()
  link2=null
}

function drop3(){
  cut.play()
  rope3.break()
  link3.break()
  link3=null
}
function collide(body,sprite,d){
  if(body!=null){
    var dis=dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
    if(dis<=d){
      return true
    }
    else{
      return false
    }
  }
}
function airBlow(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0})
  air.play()
}
function mutebg(){
  if(bgSound.isPlaying()){
    bgSound.stop()
  }
  else{
    bgSound.play()
  }
}