song_1 = "";
song_2 = "";

song_status_1 = "";
song_status_2 = "";

wrist_leftX = 0;
wrist_leftY = 0;
wrist_rightX = 0;
wrist_rightY = 0;

score_wrist_left = 0;
score_wrist_right = 0;

function preload(){
    song_1 = loadSound("=(Equal Sing).mp3");
    song_2 = loadSound("Snow Flower.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelLoad);
    poseNet.on("pose", gotposes);
}

function modelLoad(){
    console.log("Modelo Cargado");
}

function gotposes(results){
    console.log(results);
    if(results.lenght > 0){
        score_wrist_right = results[0].pose.keypoints[10].score;
        score_wrist_left = results[0].pose.keypoints[9].score;
        console.log("Puntaje muñeca izquierda = " + score_wrist_left + "Puntaje muñeca derecha = " + score_wrist_left);
        wrist_rightX = results[0].pose.rightWrist.x;
        wrist_rightY = results[0].pose.rightWrist.y;
        console.log("Posición de la muñeca derecha en X = " + wrist_rightX + "Posición de la muñeca derecha en Y = " + wrist_rightY);
        wrist_leftX = results[0].pose.leftWrist.x;
        wrist_leftY = results[0].pose.leftWrist.y;
        console.log("Posición de la muñeca izquierda en X = " + wrist_leftX + "Posición de la muñeca izquierda en Y = " + wrist_leftY);
    }
}

function draw(){
    image(video, 0, 0, 600, 500);
    song_status_1 = song_1.isPlaying();
    song_status_2 = song_2.isPlaying();
    fill("black");
    stroke("black");
    if(score_wrist_right > 0.2){
        circle(wrist_rightX, wrist_rightY, 20);
        song_2.stop();
        if(song_status_1 == false){
            song_1.play();
            document.getElementById("song").innerHTML = "Reproduciendo =(Equal Sing)";
        }
    }
    if(score_wrist_left > 0.2){
        circle(wrist_leftX, wrist_leftY, 20);
        song_1.stop();
        if(song_status_2 == false){
            song_2.play();
            document.getElementById("song").innerHTML = "Reproduciendo Snow Flower";
        }
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}