let video;
let poseNet;
let poses = [];

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.size(width, height);

    // create a new poseNet method with a single detection
    poseNet = ml5.poseNet(video, modelReady);
    poseNet.on('pose', results => {
        poses = results;
    });

    video.hide();
}

// function gotPoses(poses) {
//     // console.log(poses);
//     if (poses.length > 0) {
//         pose = poses[0].pose;
//         skeleton = poses[0].skeleton
//     }
// }

function modelReady() {
    console.log('poseNet ready');
}

function draw() {
    image(video, 0, 0, width, height);

    // call both functions to draw keypoints and skelletons
    drawKeypoints();
    drawSkeleton();
}

const drawKeypoints = () => {
    // loop through all poses detected
    for (let i = 0; i < poses.length; i++) {
        //for all the poses detected, loop through all the keypoints
        let pose = poses[i].pose;
        for (let j = 0; j < pose.keypoints.length; j++) {
            // a keypoint is an object describing a body part
            let keypoint = pose.keypoints[j];
            // only draw an ellipse if the pose probability is bigger than 0.2
            if (keypoint.score > 0.2) {
                fill(220, 20, 60);
                noStroke();
                ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
            }
        }
    }
}

// function to draw the skeleton (connect the dots)
const drawSkeleton = () => {
    // loop through all the skeletons detected
    for (let i = 0; i < poses.length; i++) {
        let skeleton = poses[i].skeleton;

        // for every skeleton, loop through all body connections
        for (let j = 0; j < skeleton.length; j++) {
            let partA = skeleton[j][0];
            let partB = skeleton[j][1];
            stroke(220, 20, 60);
            line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
        }
    }
}