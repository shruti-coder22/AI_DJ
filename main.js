var song = "";

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

score_rw = 0;
score_lw =0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        
        score_rw = results[0].pose.keypoints[10].score;
        score_lw = results[0].pose.keypoints[9].score;
        console.log("Score of lw is " + score_lw + ", and the score of rw is " + score_rw);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("The x position of the right wrist is " + rightWristX + " and the y position is " + rightWristY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("The x position of the left wrist is " + leftWristX + " and the y position is " + leftWristY);
    }
}

function modelLoaded() {
    console.log("❁poseNet modal initialized❁")
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    if(score_rw > 0.2) {
        circle(rightWristX - 20, rightWristY - 20, 20);

        if (rightWristY > 0 && rightWristY < 100) {
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        } else if (rightWristY > 100 && rightWristY < 200) {
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
        }  else if (rightWristY > 200 && rightWristY < 300) {
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        } else if (rightWristY > 300 && rightWristY < 400) {
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
        } else if (rightWristY > 400 && rightWristY < 500) {
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
    }

    if (score_lw >0.2) {
        circle(leftWristX - 20, leftWristY - 20, 20);
        left_int = Number(leftWristY);
        remove_decimal = floor(left_int);
        volume = remove_decimal/500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
}

function play() {
    song.play();

    song.setVolume(0.5);
    song.rate(1);
}

function pause() {
    song.pause();
}

function stop() {
    song.stop();
}