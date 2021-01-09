

var table = document.getElementById("table");
var cells = table.getElementsByTagName("td");
// console.log(cells);


// for(let i = 0;i<cells.length;i++){
//     cells[i].parentNode.setAttribute("name","id"+i+".SHSQuarter");
// }


var rowCount = table.rows.length;
var trCell = table.getElementsByTagName("tr");

for(let i = 0;i<rowCount;i++){
  trCell[i].setAttribute("name","id"+i);
}







function calculation(firstQuarter,secondQuarter){
    // var firstQuarter = table.getElementsByTagName("td")[1].innerHTML;
    // var secondQuarter = table.getElementsByTagName("td")[2].innerHTML;
    // var average = table.getElementsByTagName("td")[3].innerHTML;
    var sum = ((firstQuarter+secondQuarter)/2);
    console.log("average: "+sum)
}



for(let i =0 ; i < cells.length; i++){

    var firstQuarter = 0;
    var secondQuarter = 0;

    cells[i].onclick = function(){

        // var rowIndex = this.parentNode.rowIndex;  
        var colIndex = this.cellIndex;   
        var parentIndex = this.parentNode.getAttribute("name");

        console.log("parentIndex: "+parentIndex);
        console.log("column: "+colIndex);
        //////////////////////////////////////////

       
        if(colIndex == '1'){
            firstQuarter = this.innerHTML;
            console.log(firstQuarter);
            return;
        }
 
   


        /////////////////////////
        if(this.hasAttribute('data-clicked')){
            return;
        }
        this.setAttribute('data-clicked','yes');
        this.setAttribute('data-text',this.innerHTML);

        var input = document.createElement("input");
        input.setAttribute("type","text");
        input.value = this.innerHTML;
        // input.style.width = this.offsetWidth - (this.clientLeft * 2) + "px";
        // input.style.height = this.offsetHeight - (this.clientTop * 2) + "px";
        // input.style.border = "0px";
        // input.style.fontFamily = "inherit";
        // input.style.fontSize = "inherit";
        // input.style.textAlign = "inherit";
        input.style.border = "none"
        input.style.background = "LightGoldenRodYellow";


        input.onblur = function(){
            var td = input.parentElement;
            var orig_text = input.parentElement.getAttribute('data-text');
            var current_text = this.value;
            if(orig_text != current_text){
                // there are some changes
                td.removeAttribute('data-clicked');
                td.removeAttribute('data-text');
                td.innerHTML = current_text;
                console.log(orig_text + ' is changed to '+current_text );
            }else{
                td.removeAttribute('data-clicked');
                td.removeAttribute('data-text');
                td.innerHTML = orig_text;
                console.log('no changed made');
            }
        }

        input.onkeypress = function(){
            if(event.keyCode == 13){
                this.blur(); //run onblur
            }
        }

        this.innerHTML = '';
        // this.style.cssText = "padding: 0px 0px";
        this.append(input);
        this.firstElementChild.select();
    }
}