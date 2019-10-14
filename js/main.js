const db=firebase['firestore']();

function changePage(idIn, idOut){
    document.getElementById(idIn).classList.remove("invisible");
    document.getElementById(idOut).className += " invisible";
}

function triviaStarter(){
    var preguntas = 4;
    var i = parseInt(Math.random() * (preguntas - 1) + 1);
    db.collection("Preguntas").doc(i.toString()).get().then(snap => {
        document.getElementById("question").innerHTML = snap.data().Pregunta;
        var j = parseInt(Math.random() * 4 + 1);
        document.getElementById("span_answer" + j).innerHTML = snap.data().Correcta;
        var contador = 1;
        for(var k=1; k<=4; k++){
            if(k!=j){
                if(contador==1){
                    document.getElementById("span_answer" + k).innerHTML = snap.data().Incorrecta1;
                    contador++;
                }else if(contador==2){
                    document.getElementById("span_answer" + k).innerHTML = snap.data().Incorrecta2;
                    contador++;
                }else if(contador==3){
                    document.getElementById("span_answer" + k).innerHTML = snap.data().Incorrecta3;
                    contador++;
                }
            }
        }
    });
}