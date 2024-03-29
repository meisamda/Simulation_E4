function f1() {
    var value = document.getElementById('userInput').value;
    var body_table = "";
    var all_table = "";
    var inv_sday =[""];                           // موجودی در ابتدای روز
    var rd_taghaza =[""];                         // ارقام تصادفی برای تقاضا   
    var taghaza =[""];                            // تقاضا   
    var inv_eday =[""];                            // موجودی در انتهای روز
    var shortage =[""];                           // مقدار کمبود
    var order =[""];                              // مقدار سفارش              
    var rd_delivery =[""];                        // ارقام تصادفی برای مهلت تحویل
    var remain_day =[""];                         // روز های مانده تا ورود سفارش
    var difference =[""];                         // ماب تفاوت تقاضا و موجودی
    var inv_eday_all = 0 ;                        // مجموع همه موجودی در انتهای روزها

    //document.getElementById('userInput').className = (value == 0) ? "winput" : "cinput";
    if((!value) | isNaN(value) | value == 0 | value < 0){
        document.getElementById('userInput').className ="winput"; 
        document.getElementById("talkbubbleleft").style.animation = "example 3s infinite";
    }
    else{
        document.getElementById("talkbubbleleft").style.animation = "";
        document.getElementById('userInput').className ="cinput"; 
    }
    
    for (i = 1; i <= value*5; i++){
        rd_taghaza[i] = 00 + Math.floor(Math.random() * 99);
        if(rd_taghaza[i] >= 01 & rd_taghaza[i] <= 10){
            taghaza[i] = 0 ;
        }
        else if(rd_taghaza[i] >= 11 & rd_taghaza[i] <= 35){
            taghaza[i] = 1 ;
        }
        else if(rd_taghaza[i] >= 36 & rd_taghaza[i] <= 70){
            taghaza[i] = 2 ;
        }
        else if(rd_taghaza[i] >= 71 & rd_taghaza[i] <= 91){
            taghaza[i] = 3 ;
        }
        else if((rd_taghaza[i] >= 92 & rd_taghaza[i] <= 99) | rd_taghaza[i] == 0){
            taghaza[i] = 4 ;
        }
        
        inv_sday[i] = inv_eday[i-1];
        inv_sday[1] = 3;
        inv_sday[3] = 8 + inv_eday[2];

        order[i] = "-";
        rd_delivery[i] = "-";
        var j = Math.ceil(i / 5)*5; //ساخت ایندکس اختصاصی برای مقدار سفارش و ارقام تصادفی برای مهلت تحویل
        rd_delivery[j] = 0 + Math.floor(Math.random() * 9);
        remain_day[i] = "-";

        var k = j - 5; //چون ت از ده میباشد از 5 کم میکنیم تا ایندکس جدید بگیریم
        remain_day[k+1] = remain_day[k] -1;
        
        //********************** ستون اخر
        if(remain_day[k+1] == 0){
            inv_sday[k+2] = inv_eday[k+1] + order[k];
        }
        else if(remain_day[k+1] != 0){
            remain_day[k+2] = remain_day[k+1] -1;
            if(remain_day[k+2] == 0){
                inv_sday[k+3] = inv_eday[k+2] + order[k];
            }
            else if(remain_day[k+2] != 0){
                remain_day[k+3] = remain_day[k+2] -1;
                inv_sday[k+4] = inv_eday[k+3] + order[k];
            }
        }
        shortage[0] = 0;
        difference[1] = inv_sday[1] - taghaza[1];
        if(difference[1] < 0){
            shortage[1] = Math.abs(difference[1]);
        }
        difference[2] = inv_sday[2] - taghaza[2];
        if(difference[2] == 0){
            shortage[2] = Math.abs(difference[2]) + shortage[1];
        }
        
        difference[i] = inv_sday[i] - taghaza[i];
        if(difference[i] > 0){
            shortage[i] = 0;
            inv_eday[i] = difference[i] - shortage[i-1];
            if(inv_eday[i]< 0){
                inv_eday[i] = 0;
            }                        
        }
        else if(difference[i] < 0){   
            inv_eday[i] = 0;
            shortage[i] = Math.abs(difference[i]) + shortage[i-1]; // کمبود ها با قبلی ها جمع میشوند.
        }
        else if(difference[i] == 0){ 
            inv_eday[i] = 0;  
            shortage[i] = shortage[i-1];
        }
       
        order[j] = 11- inv_eday[i];
                
        if(rd_delivery[j] >= 01 & rd_delivery[j] <= 06 ){
            remain_day[j] = 1;
        }
        else if(rd_delivery[j] >= 07 & rd_delivery[j] <= 09 ){
            remain_day[j] = 2;
        }
        if(rd_delivery[j] ==0 ){
            remain_day[j] = 3;
        }
        
        inv_eday_all = inv_eday_all + inv_eday[i];

        remain_day[1] = 1;
        remain_day[2] = 0;
        remain_day[3] = "-";

        var day = (i%5 == 0) ? 5 : i%5;

        var header_table = "<caption>جدول شبیه سازی برای سیستم موجودی </caption><tr><th>روز های مانده تا ورود سفارش</th><th>ارقام تصادفی برای مهلت تحویل</th><th>مقدار سفارش</th><th>مقدار کمبود</th><th>موجودی در انتهای روز</th><th>تقاضا</th><th>ارقام تصادفی برای تقاضا</th><th>موجودی در ابتدای روز</th><th>روز</th><th>دور</th></tr>";
        var row_col_table;
        var footer_table;
        row_col_table = "<tr><td>"
        + remain_day[i]  + "</td><td>"
        + rd_delivery[i]  + "</td><td>"
        + order[i]  + "</td><td>"
        + shortage[i]  + "</td><td>"
        + inv_eday[i]  + "</td><td>"
        + taghaza[i]  + "</td><td>"
        + rd_taghaza[i]  + "</td><td>"
        + inv_sday[i]  + "</td><td>"
        + day  + "</td><td>"
        + j/5  + "</td>";
        body_table = body_table + row_col_table ;                    
        footer_table ="<tr><td colspan='4'></td><td>" + inv_eday_all + "</td><td colspan='4' ></td><td>مجموع</td></tr>";
        all_table= header_table + body_table + footer_table;
        document.getElementById("table").innerHTML = all_table; 
    }
}       