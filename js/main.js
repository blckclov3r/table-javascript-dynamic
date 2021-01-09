
const firstQ = document.getElementById("firstQ");
const secondQ = document.getElementById("secondQ");
const averageQ =  document.getElementById("avg");
const remarksQ = document.getElementById("rmk");

function average(){
    
    //check if the first Quarter && second Quarter input is empty
    if(firstQ.value.trim() == '' || secondQ.value.trim() == ''){
        remarksQ.innerHTML = '';
        return;
    }

    // string -> Integer
    let a = parseInt(firstQ.value);
    let b = parseInt(secondQ.value);
    
    let avg = ((a+b)/2);

    // if avg is a Number == true && get the output
    if(!isNaN(avg)){
        averageQ.value = avg;
    }
 
    if(avg <75){
        remarksQ.innerHTML = "Failed";
        remarksQ.style.color = "red";
    }else{
        remarksQ.innerHTML = "Passed";
        remarksQ.style.color = "green";
    }

  
}

function onLimit100(val){

    if(Number(val.value) > 100){
        val.value = 100;
    }
    
    //call average every keypress
    average();
    console.log("onLimit100 invoked");
}


// input checker > number only
function isNumber(evt){
    evt = evt ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}