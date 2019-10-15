const db=firebase['firestore']();
var correct = 2;

function changePage(idIn, idOut){
    if(idIn=="trivia-section"){
        triviaStarter();
    }
    document.getElementById(idIn).classList.remove("invisible");
    document.getElementById(idOut).className += " invisible";
}

function triviaStarter(){
    var questions = 4;
    var i = parseInt(Math.random() * (questions - 1) + 1);
    db.collection("Preguntas").doc(i.toString()).get().then(snap => {
        document.getElementById("question").innerHTML = snap.data().Pregunta;
        correct = parseInt(Math.random() * 4 + 1);
        document.getElementById("span_answer" + correct).innerHTML = snap.data().Correcta;
        var count = 1;
        for(var k=1; k<=4; k++){
            if(k!=correct){
                if(count==1){
                    document.getElementById("span_answer" + k).innerHTML = snap.data().Incorrecta1;
                    count++;
                }else if(count==2){
                    document.getElementById("span_answer" + k).innerHTML = snap.data().Incorrecta2;
                    count++;
                }else if(count==3){
                    document.getElementById("span_answer" + k).innerHTML = snap.data().Incorrecta3;
                    count++;
                }
            }
        }
    });
}

function checkAnswer(answer){
    if(answer==correct){
        correctAnswer();
    }else{
        wrongAnswer();
    }
}

function wrongAnswer(){
    alert("Wrong answer!");
}

function correctAnswer(){
    changePage('plants-section','trivia-section');
} 