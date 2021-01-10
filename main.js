$(document).ready(function(){

  
    
    let ajax_data = [
        {fname: "Aljun",fQuarter: "100",sQuarter: "75",avg: "0",remark:"?"},
        {fname: "Wilcris",fQuarter: "0",sQuarter: "0",avg: "0",remark:"?"},
        {fname: "Steph",fQuarter: "0",sQuarter: "0",avg: "0",remark:"?"},
        {fname: "NC",fQuarter: "0",sQuarter: "0",avg: "0",remark:"?"}
    ];


    var avgCall = function(){

        $.each(ajax_data,function(index,val){
            let fQuarter = $(".row_data").filter(':not([col_name]), [col_name="fQuarter"]').html();
            let sQuarter = $(".row_data").filter(':not([col_name]), [col_name="sQuarter"]').html();
            let avg = parseFloat((parseInt(fQuarter)+parseInt(sQuarter))/2);

            if(avg == 0){
                avg = 0;
            }
            
            console.log(avg);
            return avg;

        });
        
    }
   

    // var random_id = function(){
    //     let id_num = Math.random().toString().substr(2,3);
    //     let id_str = Math.random().toString(36).substr(2);
    //     console.log("id_num: "+id_num+", id_str: "+id_str);
    //     return id_num+id_str;
    // }

    let tbl = "";
    tbl += '<table class="table table-hover">'

    tbl+='<thead>';
            tbl+='<tr>';
                tbl+='<th>Firstname</th>';
                tbl+='<th>First Quarter</th>';
                tbl+='<th>Second Quarter</th>';
                tbl+='<th>Average</th>';
                tbl+='<th>Remark</th>';
            tbl+='</tr>';
    tbl+='</thead>';

    tbl += '<tbody>';

        $.each(ajax_data,function(index,val){

            let fQuarter = parseInt(val['fQuarter']);
            let sQuarter = parseInt(val['sQuarter']);
            let avg = parseFloat((fQuarter+sQuarter)/2);
            let remark = "";

            if(avg < 75 && avg != 0){
                remark = "failed";
            }else if(avg > 75){
                remark = "passed";
            }else{
                remark = "?"
            }

            // let row_id = random_id();

            // tbl+='<tr row_id="'+row_id+'">';
            tbl+='<tr>'
            tbl +='<td ><div class="row_data"  col_name="fname">'+val['fname']+'</div></td>';
            tbl +='<td ><div class="row_data"  col_name="fQuarter">'+val['fQuarter']+'</div></td>';
            tbl +='<td ><div class="row_data"  col_name="sQuarter">'+val['sQuarter']+'</div></td>';
            tbl +='<td ><div class="row_data"  col_name="avg">'+avg+'</div></td>';
            tbl +='<td ><div class="row_data"  col_name="remark">'+remark+'</div></td>';

            tbl+='</tr>';
        });

    tbl += '</tbody>';

    tbl+='</table>';

    $(document).find('.tbl_user_data').html(tbl);


    var selectAll = function(){
        document.execCommand('selectAll',false,null);
    }

    $(document).on('click','.row_data',function(event){
        event.preventDefault();

        $(this).closest('div').attr('contenteditable','true');
        $(this).addClass('bg-input').css('padding','5px');
        $(this).focus();
        selectAll(); 
    });

  


    $(document).on('focusout','.row_data',function(event){
        event.preventDefault();

        let tbl_row = $(this).closest('tr');
        let row_id = $(this).closest('tr').attr('row_id');


        let tblArr = {};
        let firstQuarter = 0;
        let secondQuarter = 0;
        let avg =0.0;

        tbl_row.find('.row_data').each(function(index,val){
            
            
            let col_name = $(this).attr('col_name');
            let col_val = $(this).html();
            tblArr[col_name] = col_val;

            firstQuarter = parseInt(tblArr["fQuarter"]);
            secondQuarter = parseInt(tblArr["sQuarter"]);  
            if(firstQuarter == 0 || secondQuarter == 0){
                return;
            }     
            avg = parseFloat((firstQuarter+secondQuarter)/2);
            let remark = "";
            if(avg < 75){
                remark = "failed";
            }else {
                remark = "passed";
            }
            $(this).filter(':not([col_name]), [col_name="remark"]').html(remark);
            $(this).filter(':not([col_name]), [col_name="avg"]').html(avg);

        });


        let row_div = $(this).removeClass('bg-input').css('padding','');

        let col_name = row_div.attr('col_name'); //fname
        let col_val = row_div.html();
        
        let arr = {};
        arr[col_name] = col_val;

        $.extend(arr,{row_id:row_id});


        $('.post_msg').html('<pre>'+JSON.stringify(arr,null,2)+'</pre>');


    
    });

    avgCall();

});