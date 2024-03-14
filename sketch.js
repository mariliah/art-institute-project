let handpose;
let video;
let hands = [];

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.size(width, height);
    handpose = ml5.handpose(video, modelReady);

    console.log("HANDPOSE: ", handpose);
    // listen to new hand events
    handpose.on('hand', results => {
        hands = results;
    })

    // hide the video element, and just show the canvas
    video.hide();
}

//when the model is loaded
function modelReady() {
    console.log('model is loaded');
}


function draw() {
    image(video, 0, 0, width, height);

    // call both functions to draw all keypoints and skeletons
    drawKeypoints();
}

function drawKeypoints() {
    for (let i = 0; i < hands.length; i += 1) {
        const hand = hands[i];
        for (let j = 0; j < hands.landmarks.length; j += 1) {
            const keypoint = hand.landmarks[j];
            fill(0, 255, 0);
            noStroke();
            ellipse(keypoint[0], keypoint[1], 10, 10);
        }
    }
}