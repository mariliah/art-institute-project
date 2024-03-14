// using the coding train's video, following along
let model;
let targetLabel = 'C';
// let trainingData = [] this isn't needed because there is a function called addData that we can work with to save the data
let state = 'collection';

function setup() {
    createCanvas(400, 400);

    let options = {
        inputs: ['x', 'y'],
        outputs: ['label'],
        task: 'classification',
        debug: 'true',
        learningRate: 0.5
    };

    model = ml5.neuralNetwork(options);
    model.loadData('mouse-notes.json')
    background(255);
}
function keyPressed() {

    console.log('started training')
    if (key === 't') {
        state = 'training';
        model.normalizeData();
        let options = {
            epochs: 200
        };
        model.train(options, whileTraining, finishedTraining);
    } else if (key === 's') {
        model.saveData('mouse-notes');
    }
    else {
        targetLabel = key.toUpperCase()
    }
}

// loss is another word for error (kind of)
function whileTraining(epoch, loss) {
    console.log(epoch);
}

function finishedTraining() {
    console.log('finished training');
    state = 'prediction';
}
function mousePressed() {
    let inputs = {
        x: mouseX,
        y: mouseY
    };
    if (state === 'collection') {
        let target = {
            label: targetLabel
        };
        model.addData(inputs, target);
        stroke(0);
        noFill();
        ellipse(mouseX, mouseY, 24);
        fill(0);
        noStroke();
        textAlign(CENTER, CENTER);
        text(targetLabel, mouseX, mouseY);
    } else if (state === 'prediction') {
        model.classify(inputs);
    }
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
        return;
    }
    console.log(results);
    stroke(0);
    fill(0, 0, 255, 100);
    ellipse(mouseX, mouseY, 24);
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    text(results[0].label, mouseX, mouseY);
}