song = "";

function preload()
{
    song = loadSound("music.mp3");

}

function setup() 
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);

}

function draw()
{
    Image(video, 0, 0, 600, 500);

    FileList("#FF0000");
    stroke("FF0000");

    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX, rightWristY,20);

        if(rightWristY >0 && rightWrist <= 100)
        {
            document.getElementById("speed").innerHTML = "Velocidade = 0.5x";

            song.rate(0.5);
        }
        else if(rightWristY >100 && rightWristY <= 200)
        {
            document.getElementById("speed").innerHTML = "Velocidade = 1x";

            song.hate(1);

            }
            else if(rightWristY >200 && rightWristY <= 300)
            {
                document.getElementById("speed").innerHTML = "Velocidade = 1x5"; 

            }
            else if(rightWristY >300 && rightWristY <= 400)
            {
                document.getElementById("speed").innerHTML = "Velocidade = 2x"; 

                song.rate(2);

            }
            else if(rightWristY >400)
            {

                document.getElementById("speed").innerHTML = "Velocidade = 2.5";
                
                song.rate(2.5);
            }        

        }


    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        inNumberLeftWristY = number(LeftWristY);
        remove_decimals = floor(inNumberLeftWristY);
        volume = remove_decimais/500;
        document.getElementById("volume").innerHTML = "volume = " + volume;

        song.setVolume(volume);
    }

}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);

}

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function modelLoaded(){
    console.log('poseNet is Initialized');
}

function gotPoses(results){

    if(results.length > 0){

        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " +  scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);

        console.log(results);
        rightWristX = results[0].pose.rightWrist.X;
        rightWristY = results[0].pose.rightWrist.Y;
        console.log("rightWristX = "+ rightWristX +" rightWristY = "+ rightWristY);

        leftWristX = results[0].pose.leftWrist.X;
        leftWristY = results[0].pose.leftWrist.Y;
        console.log("leftWristX = "+ leftWristX +" leftWristY = "+ leftWristY);
    }
}

