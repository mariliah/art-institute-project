// using the coding train's video, following along
let model;
let targetLabel = 'C';
// let trainingData = [] this isn't needed because there is a function called addData that we can work with to save the data

function setup() {
    createCanvas(400, 400);

    let options = {
        inputs: ['x', 'y'],
        outputs: ['label'],
        task: 'classification',
        debug: 'true'
    }

    model = ml5.neuralNetwork(options);
    background(255);
}
function keyPressed() {

    console.log('started training')
    if (key === 't') {
        model.normalizeData();
        let options = {
            epochs: 200
        }
        model.train(options, whileTraining, finishedTraining);
    } else {
        targetLabel = key.toUpperCase()
    }
}

// loss is another word for error (kind of)
function whileTraining(epoch, loss) {
    console.log(epoch);
}

function finishedTraining() {
    console.log('finished training');
}
function mousePressed() {
    let inputs = {
        x: mouseX,
        y: mouseY
    };

    let target = {
        label: targetLabel
    }

    model.addData(inputs, target);


    stroke(0);
    noFill();
    ellipse(mouseX, mouseY, 24);
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    text(targetLabel, mouseX, mouseY);
}