function changePage(idIn, idOut){
    document.getElementById(idIn).classList.remove("invisible");
    document.getElementById(idOut).className += " invisible";
}