const db = firebase['firestore']();
const defaultStorage = firebase.storage();

var currentTriviaQuestion = 3;
var nextLevel = false;
var correct = 2;

function changePage(idIn, idOut) {
    if (idIn == "trivia-section") {
        if(idOut=="plants-section" && nextLevel){
            win(true)
            setTimeout(function(){
                win(false);
                nextLevel = false;
                if(currentTriviaQuestion==1){
                    level = 1;
                }else if(currentTriviaQuestion==6){
                    level = 2;
                }else if(currentTriviaQuestion==11){
                    level = 3;
                }
                startLevel(level);
            },2000);
        }
        triviaStarter();
    }
    if (idIn == "plants-section") {
        plantLoader(currentTriviaQuestion);
    }else if(idIn=="levels-section"){
        levelSelector();
    }
    document.getElementById(idIn).classList.remove("invisible");
    document.getElementById(idOut).className += " invisible";
}

function ramdomizer(questions) {
    return parseInt(Math.random() * (questions - 1) + 1);;
}

function startLevel(level){
    if(level==1){
        currentTriviaQuestion = 1;        
    }else if(level==2){
        currentTriviaQuestion = 6;
    }else if(level==3){
        currentTriviaQuestion = 11;
    }
    if(localStorage.getItem("question"+currentTriviaQuestion)!="blank"){
        for(let k=0;k<5;k++){
            localStorage.setItem("question"+(currentTriviaQuestion+k),"blank");
        }
    }
    triviaStarter();
    changePage('trivia-section','levels-section');
    charge(true);
}

function levelSelector(){
    for(let h=1; h<=15; h++){
        document.getElementById("levelStar" + h).src = localStorage.getItem("question" + h)!="blank"?"img/" + localStorage.getItem("question" + h) + "Star.png":"img/star.png";
    }
}

function start(){
    if(localStorage.getItem("question1")==null){
        localStorage.setItem("question1","blank");
        localStorage.setItem("question2","blank");
        localStorage.setItem("question3","blank");
        localStorage.setItem("question4","blank");
        localStorage.setItem("question5","blank");
        localStorage.setItem("question6","blank");
        localStorage.setItem("question7","blank");
        localStorage.setItem("question8","blank");
        localStorage.setItem("question9","blank");
        localStorage.setItem("question10","blank");
        localStorage.setItem("question11","blank");
        localStorage.setItem("question12","blank");
        localStorage.setItem("question13","blank");
        localStorage.setItem("question14","blank");
        localStorage.setItem("question15","blank");
    }
}

function triviaStarter() {
    db.collection("Preguntas").doc(currentTriviaQuestion.toString()).get().then(snap => {
        document.getElementById("question").innerHTML = snap.data().Pregunta;
        correct = parseInt(Math.random() * 3 + 1);
        document.getElementById("span_answer" + correct).innerHTML = snap.data().Correcta;
        var count = 1;
        for (var k = 1; k <= 3; k++) {
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
        let stars = 0;
        if(currentTriviaQuestion<6){
            stars = 0;
        }else if(currentTriviaQuestion<11){
            stars = 5;
        }else{
            stars = 10;
        }
        for(let j=1;j<6;j++){
            let value_ = "img/" + localStorage.getItem("question" + (j+stars)) + "Star.png";
            document.getElementById("star" + j).src = value_;
        }
        charge(false);
    });
}

function checkAnswer(answer) {
    if(currentTriviaQuestion==5 || currentTriviaQuestion==10 || currentTriviaQuestion==15){
        nextLevel = true;
    }
    if (answer == correct) {
        correctAnswer(answer);
    } else {
        wrongAnswer(answer);
    }    
}

function check(on_off, correct_incorrect){
    for(let i=1; i<4; i++){
        if(on_off){
            if(i==correct){
                document.getElementById("answer" + i).className = "correctAnswer " + document.getElementById("answer" + i).className;
                if(!correct_incorrect){
                    document.getElementById("answer" + i).classList.add("animation");
                }
            }else{
                document.getElementById("answer" + i).className = "wrongAnswer " + document.getElementById("answer" + i).className;                 
                if(!correct_incorrect){
                    document.getElementById("answer" + i).classList.add("animation");
                }
            }
        }else{
            if(i==correct){
                document.getElementById("answer" + i).classList.remove("correctAnswer");                
                if(!correct_incorrect){
                    document.getElementById("answer" + i).classList.remove("animation");
                }
            }else{                    
                document.getElementById("answer" + i).classList.remove("wrongAnswer");           
                if(!correct_incorrect){
                    document.getElementById("answer" + i).classList.remove("animation");
                }
            }
        }
    }
}

function wrongAnswer(answer) {
    // alert("Wrong answer!");
    // document.getElementById("answer" + answer).className = "animation wrongAnswer " + document.getElementById("answer" + answer).className;
    check(true, false);
    // document.getElementById("answers_div").classList.add("answer_div");
    document.getElementById("block").classList.remove("invisible");
    setTimeout(function () {
        document.getElementById("answer" + answer).classList.remove("animation");
        setTimeout(function () {
            document.getElementById("block").classList.add("invisible");
            // document.getElementById("answers_div").classList.remove("answer_div");
            // document.getElementById("answer" + answer).classList.remove("wrongAnswer", "animation");
            check(false, false);
            charge(true);
            changePage("plants-section","trivia-section");
            plantLoader(currentTriviaQuestion);
            localStorage.setItem("question" + currentTriviaQuestion,"wrong");
            if(currentTriviaQuestion==15){
                currentTriviaQuestion = 1;
            }else{
                currentTriviaQuestion++;
            }            
        }, 1000);
    }, 1000);
}

function correctAnswer(answer) {
    // document.getElementById("answer" + answer).className = "animation correctAnswer " + document.getElementById("answer" + answer).className;
    check(true, true);
    document.getElementById("block").classList.remove("invisible");
    // document.getElementById("answers_div").classList.add("answer_div");
    setTimeout(function () {
        win(false);
        document.getElementById("block").classList.add("invisible");
        // document.getElementById("answers_div").classList.remove("answer_div");
        // document.getElementById("answer" + answer).classList.remove("correctAnswer", "animation");
        check(false, true);
        charge(true);
        changePage("plants-section","trivia-section");
        plantLoader(currentTriviaQuestion);
        localStorage.setItem("question" + currentTriviaQuestion,"correct");
        if(currentTriviaQuestion==15){
            currentTriviaQuestion = 1;
        }else{
            currentTriviaQuestion++;
        }
    }, 2000);
}

function charge(ok) {
    if (ok) {
        document.getElementById("charge").classList.remove("invisible");
    } else {
        document.getElementById("charge").classList.add("invisible");
    }
}

function win(ok){
    if (ok) {
        document.getElementById("win").classList.remove("invisible");
    } else {
        document.getElementById("win").classList.add("invisible");
    }
}

function plantLoader(currentQuestion) {

    db.collection("Preguntas").doc(currentQuestion.toString()).get().then(snap => {
        document.getElementById("plant-description-p").innerHTML = snap.data().Respuesta;
        document.getElementById("plant-image").src = snap.data().PlantIMG;
        setTimeout(function() {charge(false);},1000);
    });

    // var starsRef = defaultStorage.ref('AnswersImg/1_manzanilla.png');
    // document.getElementById("plant-image").src = (starsRef.getDownloadURL().then(function (url) {})).toString();

    // document.getElementById("plant-image").src = 'https://firebasestorage.googleapis.com/v0/b/ambi-67875.appspot.com/o/AnswersImg%2F1_manzanilla.png?alt=media&token=e28265c8-e837-4878-8caa-82e1f1e17317';
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
        "https://firebasestorage.googleapis.com/v0/b/ambi-67875.appspot.com/o/AnswersImg%2F7_ginseng.png?alt=media&token=27d3fb57-1127-4c21-a6ea-7b4d2cc6e68d",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",

    ];

    for (let i = 0; i < preguntas.length; i++) {
        db.collection("Preguntas").doc((i + 1).toString()).set({
            Correcta: "Correcta",
            Incorrecta1: "Incorrecta",
            Incorrecta2: "Incorrecta",
            Incorrecta3: "Incorrecta",
            PlantIMG: plantsurl[i],
            Pregunta: preguntas[i],
            Respuesta: respuestas[i],
        }).then(function () {
            console.log("Document successfully written!");
        });
    }

}
