var img="";
var status1=" ";
objects=[];

function preload(){
    img=loadImage('living_room_couch.jpg');
}

function setup(){
    canvas=createCanvas(410,500);
    canvas.center();
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting objects";
}

function modelLoaded(){
    console.log("modell iss beingg loadedd 👍");
    status1=true;
    objectDetector.detect(img,gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects=results;
}

function draw(){
    image(img,0,0,410,500);
    if(status1 !=" "){
        objectDetector.detect(img,gotResult);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="status: object detected";
            document.getElementById("number_of_objects").innerHTML="number of objects detected are: "+objects.length;
            fill("#cf173f");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke("#cf173f");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
} 