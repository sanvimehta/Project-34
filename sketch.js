
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Composite = Matter.Composite
const Composites = Matter.Composites;
const Constraint = Matter.Constraint

var cat
var bg_img
var toy
var rope
var cut_btn
var happy_img, sad_img

function preload() {
  cat_img = loadImage("cat.png")
  bg_img = loadImage('bg.jpeg')
  toy_img = loadImage('2432.png')
  happy_img= loadImage('happy_cat_img.png')
  sad_img = loadImage('sad_cat_img.png')
}

function setup() {
  createCanvas(700, 700);

  engine = Engine.create();
  world = engine.world;
  //createImg()is used to convert an image into a button

  cat = createSprite(350, 575, 80, 60)
  cat.addImage('sitting', cat_img)
  cat.scale = 0.2

  cat.addImage('happycat', happy_img)
  cat.addImage('sadcat', sad_img)


  cut_btn = createImg('cut_button.png')
  cut_btn.position(280, 0)
  cut_btn.size(50, 50)
  cut_btn.mouseClicked(drop)

  toy = Bodies.circle(300, 300, 20);
  rope = new Rope(7, { x: 300, y: 0 });
  Matter.Composite.add(rope.body, toy);
  toy_con = new Link(rope, toy);

}


function draw() {
  background(51);
  imageMode(CENTER)
  image(bg_img, 350, 350, 900, 700);
  Engine.update(engine);
  rope.show()
  image(toy_img, toy.position.x, toy.position.y, 75, 75)
  drawSprites()

}

function drop() {
  rope.break()
  toy_con.dettach()
  toy_con = null
}

if (collide(toy, cat) == true) {
  cat.addImage(happy_img)
}
else{
  cat.addImage(sad_img)
}

function collide(body, sprite) {
  if (body != null) {
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
    if (d <= 80) {
      World.remove(engine.world, toy);
      toy = null;
      return true;
    }
    else {
      return false;
    }
  }
}
