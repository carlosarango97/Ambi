const db = firebase['firestore']();

// var db = firebase.firestore();
var defaultStorage = firebase.storage();

var correct = 2;

function changePage(idIn, idOut) {
    if (idIn == "trivia-section") {
        triviaStarter();
    }

    if (idIn == "plants-section") {
        plantLoader(1);
    }
    document.getElementById(idIn).classList.remove("invisible");
    document.getElementById(idOut).className += " invisible";
}

function triviaStarter() {
    var questions = 4;
    var i = parseInt(Math.random() * (questions - 1) + 1);
    db.collection("Preguntas").doc(i.toString()).get().then(snap => {
        document.getElementById("question").innerHTML = snap.data().Pregunta;
        correct = parseInt(Math.random() * 4 + 1);
        document.getElementById("span_answer" + correct).innerHTML = snap.data().Correcta;
        var count = 1;
        for (var k = 1; k <= 4; k++) {
            if (k != correct) {
                if (count == 1) {
                    document.getElementById("span_answer" + k).innerHTML = snap.data().Incorrecta1;
                    count++;
                } else if (count == 2) {
                    document.getElementById("span_answer" + k).innerHTML = snap.data().Incorrecta2;
                    count++;
                } else if (count == 3) {
                    document.getElementById("span_answer" + k).innerHTML = snap.data().Incorrecta3;
                    count++;
                }
            }
        }
        charge(false);
    });
}

function checkAnswer(answer) {
    if (answer == correct) {
        correctAnswer(answer);
    } else {
        wrongAnswer(answer);
    }
}

function wrongAnswer(answer) {
    // alert("Wrong answer!");
    document.getElementById("answer" + answer).className += " animation wrongAnswer";
    document.getElementById("block").classList.remove("invisible");
    setTimeout(function () {
        document.getElementById("answer" + answer).classList.remove("animation");
        setTimeout(function () {
            document.getElementById("block").classList.add("invisible");
            document.getElementById("answer" + answer).classList.remove("wrongAnswer");
            changePage("main-section", "trivia-section")
        }, 2000);
    }, 1000);
}

function correctAnswer(answer) {
    document.getElementById("answer" + answer).classList.add("correctAnswer", "animation");
    confetti.start();
    setTimeout(function () {
        document.getElementById("answer" + answer).classList.remove("correctAnswer", "animation");
        confetti.stop();
        changePage('plants-section', 'trivia-section');
    }, 4000);
}

function charge(ok) {
    if (ok) {
        document.getElementById("charge").classList.remove("invisible");
    } else {
        document.getElementById("charge").classList.add("invisible");
    }
}


function plantLoader(currentQuestion) {

    db.collection("Preguntas").doc(currentQuestion.toString).get().then(snap => {
        document.getElementById("plant-image").src = defaultStorage.refFromURL(snap.data().PlantIMG);
        document.getElementById("plant-description-p").innerHTML = snap.data().Respuesta;


    });

}
