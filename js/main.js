const db = firebase['firestore']();
const defaultStorage = firebase.storage();

var currentTriviaQuestion = 1;

var correct = 2;

function changePage(idIn, idOut) {
    if (idIn == "trivia-section") {
        triviaStarter();
    }

    if (idIn == "plants-section") {
        plantLoader(currentTriviaQuestion, true);
    }
    document.getElementById(idIn).classList.remove("invisible");
    document.getElementById(idOut).className += " invisible";
}

function ramdomizer(questions) {
    return parseInt(Math.random() * (questions - 1) + 1);;
}

function triviaStarter() {

    currentTriviaQuestion = ramdomizer(15);
    db.collection("Preguntas").doc(currentTriviaQuestion.toString()).get().then(snap => {
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


function plantLoader(currentQuestion, ok) {

    let DescriptionDiv = document.getElementById("plant-description");

    ok ? DescriptionDiv.style.backgroundColor = "green" : DescriptionDiv.style.backgroundColor = "red";

    db.collection("Preguntas").doc(currentQuestion.toString()).get().then(snap => {
        document.getElementById("plant-name").innerHTML = snap.data().Correcta;
        document.getElementById("plant-image").src = snap.data().PlantIMG;
        document.getElementById("plant-description-p").src = snap.data().Descripcion;
    });

}

function registerMaker() {

    var preguntas = ["¿Qué planta se considera la más útil para acabar con la acidez estomacal?",
        "¿Qué planta se considera favorecedora para la regeneración cutánea?",
        "¿Qué planta es conocida especialmente por su acción ante las enfermedades respiratorias?",
        "¿Qué planta era utilizada en la antigüedad para tratar heridas como antiséptico?",
        "¿Qué planta se considera útil para situaciones de estrés e insomnio?",
        "¿Qué planta es bastante conocida en nuestras cocinas y también como excelente antioxidante?",
        "¿Qué planta es conocida por disminuir la tensión art erial y reducir el ritmo cardíaco?",
        "¿Qué planta es utilizada para infusiones energizantes y que mantienen activas a las personas?",
        "¿Qué planta se utiliza como digestiva y laxante gracias a su alto contenido de fibra?",
        "¿Qué planta se utiliza como aceite esencial para antiespasmódicos o sedantes?",
        "¿Qué planta es bastante popular por sus propiedades cicatrizantes?",
        "¿Qué planta se utiliza en infusiones como relajante?",
        "¿Qué planta es utilizada por su corteza para la irritación de garganta?",
        "¿Qué planta es apreciada por sus propiedades digestivas y para la expulsión de gases?",
        "¿Qué planta ha sido utilizada durante siglos para favorecer la regeneración de huesos?",
    ];
    var respuestas = ["Manzanilla",
        "Aloe Vera",
        "Eucalipto",
        "Tomillo",
        "Lavanda",
        "Orégano",
        "Pasiflora",
        "Ginseng",
        "Apio",
        "Ruda",
        "Caléndula",
        "Limoncillo",
        "Olmo",
        "Hinojo",
        "Helecho gu-sui-bu",
    ];

    var plantsurl = ["https://firebasestorage.googleapis.com/v0/b/ambi-67875.appspot.com/o/AnswersImg%2F1_manzanilla.png?alt=media&token=e28265c8-e837-4878-8caa-82e1f1e17317",
        "https://firebasestorage.googleapis.com/v0/b/ambi-67875.appspot.com/o/AnswersImg%2F3_eucalipto.png?alt=media&token=a626a841-c38a-42f1-a414-c84c4593df57",
        "https://firebasestorage.googleapis.com/v0/b/ambi-67875.appspot.com/o/AnswersImg%2F3_eucalipto.png?alt=media&token=a626a841-c38a-42f1-a414-c84c4593df57",
        "https://firebasestorage.googleapis.com/v0/b/ambi-67875.appspot.com/o/AnswersImg%2F4_Tomillo.png?alt=media&token=a01fdded-08a8-41e7-b077-13a6498e4ce6",
        "https://firebasestorage.googleapis.com/v0/b/ambi-67875.appspot.com/o/AnswersImg%2F5_lavanda.png?alt=media&token=c6d65c8c-6f94-4175-823e-3b8bd057c8d6",
        "https://firebasestorage.googleapis.com/v0/b/ambi-67875.appspot.com/o/AnswersImg%2F6_oregano.png?alt=media&token=1ba12efb-43bd-43b5-95e8-f97dae0f07b3",
        "https://firebasestorage.googleapis.com/v0/b/ambi-67875.appspot.com/o/AnswersImg%2F7_pasiflora.png?alt=media&token=4b2f8de8-2069-4e3a-8b16-d6b3594b293a",
        "https://firebasestorage.googleapis.com/v0/b/ambi-67875.appspot.com/o/AnswersImg%2F8_ginseng.png?alt=media&token=c5bbdfd9-5fd8-4e69-a4d6-90aea3e55edb",
        "https://firebasestorage.googleapis.com/v0/b/ambi-67875.appspot.com/o/AnswersImg%2F9_apio.png?alt=media&token=46d141ab-78df-4088-b641-be7cc439b171",
        "https://firebasestorage.googleapis.com/v0/b/ambi-67875.appspot.com/o/AnswersImg%2F10_ruda.png?alt=media&token=18574709-fe64-4e69-8192-2c6fc29e7f07",
        "https://firebasestorage.googleapis.com/v0/b/ambi-67875.appspot.com/o/AnswersImg%2F11_calendula.png?alt=media&token=f6f80893-5de5-4574-ac2e-4f38d06f7a6c",
        "https://firebasestorage.googleapis.com/v0/b/ambi-67875.appspot.com/o/AnswersImg%2F12_limoncillo.png?alt=media&token=1d9f01da-7473-496c-a448-1e0f92719332",
        "https://firebasestorage.googleapis.com/v0/b/ambi-67875.appspot.com/o/meme1480132738gen.jpg?alt=media&token=9d28fa8c-7925-4f27-b567-8ca956c24829",
        "https://firebasestorage.googleapis.com/v0/b/ambi-67875.appspot.com/o/meme1480132738gen.jpg?alt=media&token=9d28fa8c-7925-4f27-b567-8ca956c24829",
        "https://firebasestorage.googleapis.com/v0/b/ambi-67875.appspot.com/o/AnswersImg%2F15_HelechoGuSuiBu.png?alt=media&token=4b829fdb-405c-4226-893e-0dffd4d1b568",

    ];

    var descripcion = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ];

    for (let i = 0; i < preguntas.length; i++) {
        db.collection("Preguntas").doc((i + 1).toString()).set({
            Correcta: respuestas[i],
            Incorrecta1: "Incorrecta",
            Incorrecta2: "Incorrecta",
            Incorrecta3: "Incorrecta",
            PlantIMG: plantsurl[i],
            Pregunta: preguntas[i],
            Descripcion: descripcion[i],
        }).then(function () {
            console.log("Document successfully written!");
        });
    }

}
