// WEEK 1,2,4 TIMETABLE (sample from 5-B)

const regularTimetable = {

Monday:[
{subject:"ST(ND)",start:"09:00",end:"10:00"},
{subject:"NGD(DP)",start:"10:00",end:"11:00"},
{subject:"ERP(KS)",start:"12:00",end:"13:00"},
{subject:"CYS(JDP)",start:"13:00",end:"14:00"}
],

Tuesday:[
{subject:"JAVA LAB",start:"09:00",end:"11:00"},
{subject:"CYS(JDP)",start:"11:00",end:"12:00"},
{subject:"ERP(KS)",start:"12:00",end:"13:00"}
],

Wednesday:[
{subject:"ERP(KS)",start:"09:00",end:"10:00"},
{subject:"JAVA(ND)",start:"10:00",end:"11:00"},
{subject:"NGD(DP)",start:"12:00",end:"13:00"},
{subject:"CYS(JDP)",start:"13:00",end:"14:00"}
],

Thursday:[
{subject:"JAVA LAB",start:"09:00",end:"11:00"},
{subject:"ERP(KS)",start:"12:00",end:"13:00"},
{subject:"ST(ND)",start:"13:00",end:"14:00"}
],

Friday:[
{subject:"ST(ND)",start:"09:00",end:"10:00"},
{subject:"CYS(JDP)",start:"10:00",end:"11:00"},
{subject:"NGD LAB",start:"11:00",end:"13:00"}
],

Saturday:[
{subject:"NGD LAB",start:"08:00",end:"10:00"},
{subject:"ST(ND)",start:"10:00",end:"11:00"},
{subject:"JAVA(ND)",start:"11:00",end:"12:00"}
]

};

// WEEK 3 TIMETABLE

const week3Timetable = {

Monday:[
{subject:"NGD(DP)",start:"09:00",end:"10:00"},
{subject:"ST(ND)",start:"10:00",end:"11:00"},
{subject:"ERP(KS)",start:"12:00",end:"13:00"},
{subject:"CYS(JDP)",start:"13:00",end:"14:00"},
{subject:"NGD LAB",start:"14:00",end:"15:00"}
],

Tuesday:[
{subject:"JAVA LAB",start:"08:00",end:"10:00"},
{subject:"CYS(JDP)",start:"10:00",end:"11:00"},
{subject:"ERP(KS)",start:"11:00",end:"12:00"},
{subject:"JAVA(ND)",start:"13:00",end:"14:00"}
],

Wednesday:[
{subject:"ERP(KS)",start:"08:00",end:"09:00"},
{subject:"JAVA(ND)",start:"09:00",end:"10:00"},
{subject:"NGD(DP)",start:"10:00",end:"11:00"},
{subject:"ST(ND)",start:"11:00",end:"12:00"}
],

Thursday:[
{subject:"JAVA LAB",start:"08:00",end:"10:00"},
{subject:"CYS(JDP)",start:"10:00",end:"11:00"},
{subject:"ERP(KS)",start:"11:00",end:"12:00"},
{subject:"ST(ND)",start:"12:00",end:"13:00"}
],

Friday:[
{subject:"ST(ND)",start:"08:00",end:"09:00"},
{subject:"CYS(JDP)",start:"09:00",end:"10:00"},
{subject:"NGD LAB",start:"10:00",end:"12:00"}
]

};

function getWeekNumber(){
const date=new Date().getDate();
return Math.ceil(date/7);
}

function updateDateTime(){

const now=new Date();

document.getElementById("date").innerText=
"📅 "+now.toDateString();

document.getElementById("time").innerText=
"🕒 "+now.toLocaleTimeString();

}

function updateSchedule(){
    let timerText = "No Active Lecture";

const week=getWeekNumber();

document.getElementById("week").innerText=
week===3 ? "Week 3 Timetable" : "Week 1/2/4 Timetable";

const timetable=
week===3 ? week3Timetable : regularTimetable;

const day=
new Date().toLocaleDateString(
'en-US',
{weekday:'long'}
);

const lectures=timetable[day] || [];

const scheduleDiv=
document.getElementById("schedule");

scheduleDiv.innerHTML="";

let currentMinutes=
new Date().getHours()*60+
new Date().getMinutes();

let live="No Lecture";
let next="No Lecture";

lectures.forEach((lec,index)=>{

let start=
parseInt(lec.start.split(":")[0])*60+
parseInt(lec.start.split(":")[1]);

let end=
parseInt(lec.end.split(":")[0])*60+
parseInt(lec.end.split(":")[1]);

let cls="upcoming";

if(currentMinutes>=start &&
currentMinutes<end){

cls="current";
live=lec.subject;

let remaining=end-currentMinutes;

let hrs=Math.floor(remaining/60);
let mins=remaining%60;

timerText=`Ends In : ${hrs}h ${mins}m`;

if(index+1<lectures.length){
next=lectures[index+1].subject;
}
document.getElementById("lectureTimer").innerText =
timerText;

}

scheduleDiv.innerHTML+=`
<div class="schedule-item ${cls}">
<b>${lec.subject}</b><br>
${lec.start} - ${lec.end}
</div>
`;

});

document.getElementById("liveLecture").innerText=live;
document.getElementById("nextLecture").innerText=next;

}

setInterval(()=>{
updateDateTime();
updateSchedule();
},1000);
const toggleBtn =
document.getElementById("themeToggle");

// Saved theme load
if(localStorage.getItem("theme")==="dark"){
document.body.classList.add("dark");
toggleBtn.innerHTML="☀️ Light Mode";
}

toggleBtn.addEventListener("click",()=>{

document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){

localStorage.setItem("theme","dark");
toggleBtn.innerHTML="☀️ Light Mode";

}else{

localStorage.setItem("theme","light");
toggleBtn.innerHTML="🌙 Dark Mode";

}

});