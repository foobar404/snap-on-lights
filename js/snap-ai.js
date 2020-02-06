const classifier = ml5.soundClassifier('http://127.0.0.1:5501/snap-model/model.json', modelReady);

function modelReady() {
    // classify sound
    classifier.classify(gotResult);
}

let rebound = false;
function gotResult(error, result) {
    if (error) {
        console.log(error);
        return;
    }

    let snap = result.reduce((val, acc) => {
        return (val.label == "snap") ? val : acc;
    })

    if (snap.confidence >= .90) {
        if (!rebound) {
            toggleLight()
            rebound = true;

            setTimeout(() => {
                rebound = false;
            }, 2000)
        }
    }
}

function toggleLight() {
    document.querySelector("main").classList.toggle("on");
}