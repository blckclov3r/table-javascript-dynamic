function rtl(element)
{   
    if(element.setSelectionRange){
        element.setSelectionRange(0,0);
    }
}



$(document).ready(function(){
    
    var ajax_data = [
        {fname: "Aljun",fQuarter: "0",sQuarter: "0",avg: "0",remarks:"?"},
        {fname: "Wilcris",fQuarter: "0",sQuarter: "0",avg: "0",remarks:"?"},
        {fname: "Steph",fQuarter: "0",sQuarter: "0",avg: "0",remarks:"?"},
        {fname: "NC",fQuarter: "0",sQuarter: "0",avg: "0",remarks:"?"}
    ];


    var random_id = function(){
        let id_num = Math.random().toString().substr(2,3);
        let id_str = Math.random().toString(36).substr(2);
        console.log("id_num: "+id_num+", id_str: "+id_str);
        return id_num+id_str;
    }

    var tbl = "";
    tbl += '<table class="table table-hover">'

    tbl+='<thead>';
            tbl+='<tr>';
                tbl+='<th>Firstname</th>';
                tbl+='<th>First Quarter</th>';
                tbl+='<th>Second Quarter</th>';
                tbl+='<th>Average</th>';
                tbl+='<th>Remarks</th>';
            tbl+='</tr>';
    tbl+='</thead>';

    tbl += '<tbody>';

        $.each(ajax_data,function(index,val){
            let row_id = random_id();

            tbl+='<tr row_id="'+row_id+'">';
            tbl +='<td ><div class="row_data" edit_type="click" col_name="fname">'+val['fname']+'</div></td>';
            tbl +='<td ><div class="row_data" edit_type="click" col_name="fQuarter">'+val['fQuarter']+'</div></td>';
            tbl +='<td ><div class="row_data" edit_type="click" col_name="sQuarter">'+val['sQuarter']+'</div></td>';
            tbl +='<td ><div class="row_data" edit_type="click" col_name="avg">'+val['avg']+'</div></td>';
            tbl +='<td ><div class="row_data" edit_type="click" col_name="remarks">'+val['remarks']+'</div></td>';

            tbl+='</tr>';
        });

    tbl += '</tbody>';

    tbl+='</table>';

    $(document).find('.tbl_user_data').html(tbl);


    $(document).on('click','.row_data',function(event){
        event.preventDefault();

        if($(this).attr('edit_type') == 'button'){
            return false;
        }
        
        $(this).closest('div').attr('contenteditable','true');
        $(this).addClass('bg-input').css('padding','5px');
        $(this).focus();

    });

    $(document).on('focusout','.row_data',function(event){

        event.preventDefault();

       
        if($(this).attr('edit_type')== 'button'){
            return false;
        }


        let tbl_row = $(this).closest('tr');
        let row_id = $(this).closest('tr').attr('row_id');


        var tblArr = {};
        let firstQuarter = 0;
        let secondQuarter = 0;
        let avg =0;

        tbl_row.find('.row_data').each(function(index,val){
            
            
            let col_name = $(this).attr('col_name');
            let col_val = $(this).html();
            tblArr[col_name] = col_val;

            firstQuarter = parseInt(tblArr["fQuarter"]);
            secondQuarter = parseInt(tblArr["sQuarter"]);       
            avg = parseInt((firstQuarter+secondQuarter)/2);
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

});