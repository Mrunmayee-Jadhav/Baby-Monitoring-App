set_status='';
objects=[];
song="";
person='';
set_person='';
baby='';

function preload() {
    song= loadSound('music.mp3');
}

function setup() {
    canvas=createCanvas(400, 400);
    canvas.position(550,200);

    video=createCapture(VIDEO);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML='Detecting Object';
    
}

function modelLoaded() {
    console.log('Model Loaded');
    set_status=true;
}

function gotResults(error,results) {
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}


function draw(){
    image(video,0,0,400,400);
    objectDetector.detect(video,gotResults);
    r=random(255);
    g=random(255);
    b=random(255);
    if(set_status != '') {
        for (i = 0; i < objects.length; i++) {
            document.getElementById('status').innerHTML='Object Detected';
            fill(r,g,b);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+' '+percent+'%',objects[i].x+15, objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            person= objects[i].label;
            if(person != 'person') {
                document.getElementById('baby').innerHTML='Baby not Found';
                set_person=true;
                song.play();
                song.setVolume(2);
                song.rate(1);
            }
            else if(person == 'person') {
                document.getElementById('baby').innerHTML='Baby Found';
                song.stop();
            }
            if(objects.length == 0) {
                song.play();
                baby= document.getElementById('baby').innerHTML='Baby Not Found';
            }
            
        }
        if(baby == "document.getElementById('baby').innerHTML='Baby Not Found'") {
            song.play();
        }
    }
}