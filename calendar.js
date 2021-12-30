var nowDate=new Date();
var nowYear=nowDate.getFullYear();
var nowMonth=nowDate.getMonth()+1;
var nowDay=0;
var localstorage = window.localStorage
// print(nowYear, nowMonth)
//var month=(nowMonth<10?"0"+momth:month);
var text=document.getElementById("yearAndMon");
text.innerText=nowYear+"年"+nowMonth+"月";
var monthDays1=[31,29,31,30,31,30,31,31,30,31,30,31];
var monthDays2=[31,28,31,30,31,30,31,31,30,31,30,31]
function becomeDate(nowYear,nowMonth){
    var dt=new Date(nowYear,nowMonth-1,1);
    var firstDay=dt.getDay();
    // alert(firstDay)
    var table=document.getElementById("table1");
    var monthDays=isRunNian();
    var rows=5;
    var cols=7;
    var k=1;
    let haveschedule;
    for (var i = 1; i <= rows; i++) {
        var tri = table.insertRow();
        for (var j = 1; j <= cols; j++) {
            var tdi = tri.insertCell();
            if (i === 1 && j < firstDay + 1)
                tdi.innerHTML = "";
            else {
                if (k > monthDays[nowMonth - 1])
                    break;
                tdi.innerHTML = k;
                haveschedule = nowYear.toString() + nowMonth.toString() + k.toString()
                if (localstorage[haveschedule]){
                    tdi.style.backgroundColor = '#8bc2af'
                }
                tdi.id = ""
                tdi.addEventListener('click', show)
                k++;
            }
        }

    }
}

function lastMon(){
    table1.innerHTML="";
    var text=document.getElementById("yearAndMon");
    if(nowMonth>1)
        nowMonth=nowMonth-1;
    else{
        nowYear--;
        nowMonth=12;
    }
    text.innerText=nowYear+"年"+nowMonth+"月";
    becomeDate(nowYear,nowMonth);
}

function nextMon(){
    table1.innerHTML="";
    if(nowMonth<12)
        nowMonth=nowMonth+1;
    else{
        nowYear++;
        nowMonth=1;
    }
    var text=document.getElementById("yearAndMon");
    text.innerText=nowYear+"年"+nowMonth+"月";
    becomeDate(nowYear,nowMonth);
}

function isRunNian(){
    if((nowYear%4===0||nowYear%400===0)&&nowYear%100!==0)
        return monthDays1;
    else
        return monthDays2;
}
becomeDate(nowYear,nowMonth);

function show() {
    var past = document.getElementById("thisone")
    if (past){
        past.style.borderStyle = "none"
        // alert("dga")
        past.id = ""
    }
    nowDay = this.innerText
    var title = nowYear.toString() + nowMonth.toString() + nowDay.toString()
    if (localstorage[title]){
        document.getElementById("showschedule").value = localstorage[title]
    } else {
        console.log("here")
        var showschedule = document.getElementById("showschedule")
        showschedule.value = ""
        showschedule.placeholder = "今日暂时无日程"
    }
    this.id="thisone"
    this.style.borderStyle = "solid"
    this.style.borderColor = "red"
}

function saveschedule() {
    var showschedule = document.getElementById("showschedule")
    if (showschedule.value === ""  || nowDay === 0){
        alert("文本区不能为空，或者没有选择日期")
    } else {
        var title = nowYear.toString() + nowMonth.toString() + nowDay.toString()
        localstorage[title] = showschedule.value
        alert("保存日程成功！！！")
        document.getElementById("thisone").style.backgroundColor = '#8bc2af'
    }
}

function deletschedule() {
    var title = nowYear.toString() + nowMonth.toString() + nowDay.toString()
    if (localstorage[title] && nowDay !== 0){
        if (confirm("您确定要删除此条日程？")){
            document.getElementById("thisone").style.backgroundColor = null
            document.getElementById("showschedule").value = ""
            document.getElementById("showschedule").placeholder = "今日暂时无日程"
            delete localstorage[title]
        }
    } else {
        alert("没有日程可以删除。。。。")
    }

}