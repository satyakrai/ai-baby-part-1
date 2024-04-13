results="";
img="";
status="";
play="mixkit-emergency-alert-alarm-1007.wav";
objects=[];
function preload(){
img=loadImage('baby.webp');
var play = new System.Media.SoundPlayer("mixkit-emergency-alert-alarm-1007.wav");
play.Play();
}
function setup(){
canvas=createCanvas(380, 380);
canvas.center();
video=createCapture(VIDEO);
video.size(380,380);
video.hide();

}
function Start(){
  objectDetector=ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML="Status:Detecting Objects.";

}
function modelLoaded(){
    console.log("Model Loaded!");
    status=true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error,results){
if(error){
    console.log(error);
}else{
    console.log(results);
    objects=results;
}
}


function draw(){
    image(video, 0,0,380,380);
if(status != "")
      {
        r=random(255);
        g=random(255);
        b=random(255);
        for (var i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "Status : Object Detected";
          var play = new System.Media.SoundPlayer("mixkit-emergency-alert-alarm-1007.wav");
play.Stop();
          document.getElementById("number_objects").innerHTML = "Number Of Objects Detected Are : "+objects.length;
          fill(r, g, b);
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke(r, g, b);
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
      }
    }