// //from ml5 library => https://ml5js.org

// let facemesh;
// let video;
// let predictions = [];

// function setup() {
//     createCanvas(640, 480);
//     video = createCapture(VIDEO);
//     video.size(width, height);
//     facemesh = ml5.facemesh(video, modelReady);

//     facemesh.on("predict", results => {
//         predictions = results;
//     })
//     video.hide();
// }

// function modelReady() {
//     console.log('model ready')
// }

// function draw() {
//     image(video, 0, 0, width, height);

//     drawKeypoints();
// }

// function drawKeypoints() {
//     for (let i = 0; i < predictions.length; i += 1) {
//         const keypoints = predictions[i].scaledMesh;
//         for (let j = 0; j < keypoints.length; j += 1) {
//             const [x, y] = keypoints[j];

//             fill(220, 20, 60);
//             ellipse(x, y, 5, 5);
//         }
//     }
// }