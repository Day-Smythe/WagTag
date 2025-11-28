var calendarPrevious = document.getElementById("cal-l");
var calendarCurrent = document.getElementById("cal-m");
var calendarNext = document.getElementById("cal-r")

var calendarPreviousMatrix = []
var calendarCurrentMatrix = []
var calendarNextMatrix = []

// ---------- Calendar printing ---------- //

var today = new Date();
var selectedDay = new Date();
var activeDay = [0, 0, ""];
var month = today.getMonth();
var year = today.getFullYear();
var monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "Novemeber", "December"];
var previousMonth = month - 1;
var nextMonth = month + 1;
var previousYear = year;
var nextYear = year;

if (month == 0){ 
    previousMonth = 11;
    previousYear = year - 1;
} else if (month == 11){
    nextMonth = 0;
    nextYear = year + 1;
}
function day2Grid(number) {
    var weekdayIn = (number % 7);
    if (weekdayIn == 0) { weekdayIn = 7 };
    return [weekdayIn, Math.floor((number - 1) / 7) + 1]
}
function weekDay(day) {
    if (day == 0){return 7;} else {return day;}   
}
function printCalendar(yearCal, monthCal, calendarClass, calendarObject) {
    var week = 1;
    var first2Print = weekDay(new Date(yearCal, monthCal, 1).getDay());
    var totalDays = new Date(yearCal, monthCal+1, 0).getDate();
    for (var i = 1; i <= totalDays; i++){
        var actionCell = document.querySelector(calendarClass +' .cal-' + first2Print + '-' + week + ' p');
        actionCell.classList.remove("selected-day");
        if (today.getDate() == i && monthCal == month && yearCal == year){
            document.querySelector(calendarClass + ' .cal-' + first2Print + '-' + week).classList.add("today");
            if (activeDay[0] == 0 && activeDay[1] == 0){
                activeDay[0] = first2Print;
                activeDay[1] = week;
                activeDay[2] = ".calendar-main";}
        }
        if (first2Print == 7){
            first2Print = 1;
            week++;
        } else { first2Print++;}
        actionCell.innerHTML = i;
    }
    for (var i = 0; i <= 34; i++) {
        var cell2Matrix = day2Grid(i + 1);
        var pointer = document.querySelector(calendarClass + '  .cal-' + cell2Matrix[0] + '-' + cell2Matrix[1] + ' p').innerHTML;
        if (pointer == "") {
            calendarObject[i] = 0;
        } else {calendarObject[i] = parseInt(pointer);}
    };
    document.querySelector(calendarClass + ' .cal-year p').innerHTML = yearCal;
    document.querySelector(calendarClass + ' .cal-month p').innerHTML = monthName[monthCal];
    return;
}
printCalendar(year, month, ".calendar-main", calendarCurrentMatrix);
printCalendar(nextYear, nextMonth, ".calendar-next", calendarNextMatrix);
printCalendar(previousYear, previousMonth, ".calendar-previous", calendarPreviousMatrix);

var selectedDayMatrix = [year, month, today.getDate(), today.getDay()]

// ---------- Anti-Overlap ---------- //
function traslateXMain(direction){
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth);
    var xInc = 175 + (w - 1100) / 10;
    if (direction) { xInc = "translate(" + xInc + "px)"; } else { xInc = "translate(-" + xInc + "px)";};
    calendarCurrent.style.transform = xInc;
}
calendarPrevious.addEventListener("mouseover", (event) => {
    traslateXMain(true);
    calendarPrevious.style.transform = "translateZ(-180px) translateX(-24%) scaleX(0.85)";
});
calendarPrevious.addEventListener("mouseout", (event) => {
    if (activeDay[2] !== '.calendar-previous' && activeDay[2] != '.calendar-next'){
        calendarCurrent.style.transform = "translate(0)";
        calendarPrevious.style.transform = "translateZ(-180px) translateX(-12%) scaleX(0.85)";
    } else if (activeDay[2] == '.calendar-next') {
        traslateXMain(false);
        calendarPrevious.style.transform = "translateZ(-180px) translateX(-12%) scaleX(0.85)"
    } else {
        calendarPrevious.style.transform = "translateZ(-180px) translateX(-24%) scaleX(0.85)";
    }
});
calendarNext.addEventListener("mouseover", (event) => {
    traslateXMain(false);
    calendarNext.style.transform = "translateZ(-180px) translateX(24%) scaleX(0.85)";
});
calendarNext.addEventListener("mouseout", (event) => {
    if (activeDay[2] !== '.calendar-next' && activeDay[2] != '.calendar-previous'){
        calendarCurrent.style.transform = "translate(0)";
        calendarNext.style.transform = "translateZ(-180px) translateX(12%) scaleX(0.85)";
    } else if (activeDay[2] == '.calendar-previous') {
        traslateXMain(true);
        calendarNext.style.transform = "translateZ(-180px) translateX(12%) scaleX(0.85)";
    } else {
        calendarNext.style.transform = "translateZ(-180px) translateX(24%) scaleX(0.85)";
    }
});
calendarCurrent.addEventListener("mouseout", (event) => {
    if (activeDay[2] == '.calendar-main') {
        calendarCurrent.style.transform = "translate(0)";
        calendarNext.style.transform = "translateZ(-180px) translateX(12%) scaleX(0.85)";
        calendarPrevious.style.transform = "translateZ(-180px) translateX(-12%) scaleX(0.85)";
    }
});

// ---------- Listeners ---------- //
function selectDay(day2Select) {
    if (activeDay[0] != 0 && activeDay[1] != 0) {
        document.querySelector(activeDay[2] + ' .cal-' + activeDay[0] + '-' + activeDay[1]).classList.remove("selected-day");
    }
    if (day2Select.getMonth() == monthName.indexOf(document.querySelector( '.calendar-main .cal-month p').innerHTML)){
        var dayIn = day2Grid(calendarCurrentMatrix.indexOf(day2Select.getDate()) + 1)
        document.querySelector('.calendar-main .cal-' + dayIn[0] + '-' + dayIn[1]).classList.add("selected-day");
        activeDay[2] = ".calendar-main";
    }
    if (day2Select.getMonth() == monthName.indexOf(document.querySelector('.calendar-previous .cal-month p').innerHTML)) {
        var dayIn = day2Grid(calendarPreviousMatrix.indexOf(day2Select.getDate()) + 1)
        document.querySelector('.calendar-previous .cal-' + dayIn[0] + '-' + dayIn[1]).classList.add("selected-day");
        activeDay[2] = ".calendar-previous";
        calendarNext.style.transform = "translateZ(-180px) translateX(12%) scaleX(0.85)";
    }
    if (day2Select.getMonth() == monthName.indexOf(document.querySelector('.calendar-next .cal-month p').innerHTML)) {
        var dayIn = day2Grid(calendarNextMatrix.indexOf(day2Select.getDate()) + 1)
        document.querySelector('.calendar-next .cal-' + dayIn[0] + '-' + dayIn[1]).classList.add("selected-day");
        activeDay[2] = ".calendar-next";
        calendarPrevious.style.transform = "translateZ(-180px) translateX(-12%) scaleX(0.85)";
    }
    activeDay[0] = dayIn[0];
    activeDay[1] = dayIn[1];
}
function sendDate(calName, cell){
    if (calName == "main" && calendarCurrentMatrix[cell - 1] !== 0){
        selectedDay = new Date(year, month, calendarCurrentMatrix[cell - 1]);
    }
    if (calName == "prev" && calendarPreviousMatrix[cell - 1] !== 0) {
        selectedDay = new Date(previousYear, previousMonth, calendarPreviousMatrix[cell - 1]);
    }
    if (calName == "next" && calendarNextMatrix[cell - 1] !== 0) {
        selectedDay = new Date(nextYear, nextMonth, calendarNextMatrix[cell - 1]);
    }
    selectedDayMatrix[0] = selectedDay.getFullYear();
    selectedDayMatrix[1] = selectedDay.getMonth();
    selectedDayMatrix[2] = selectedDay.getDate();
    selectedDayMatrix[3] = weekDay(selectedDay.getDate());
    selectDay(selectedDay);
    initTimetable(selectedDay)
}

// ---------- Read values ---------- //
var daysMatrix = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
var timetableMatrix = new Array(5);
for (i = 0; i < 5; i++) { timetableMatrix[i] = new Array(20) };

function readMatrix() {
    for (var i1 = 0; i1 <= 4; i1++) {
        var pointerOClock = true;
        for (var i2 = 8; i2 <= 20; i2++) {
            if (pointerOClock) {
                timetableMatrix[i1][(i2 - 8) * 2] = document.querySelector("#" + daysMatrix[i1] + "-" + i2 + " p").innerHTML;
                pointerOClock = !pointerOClock;
            }
            if (!pointerOClock) {
                timetableMatrix[i1][(i2 - 8) * 2 + 1] = document.querySelector("#" + daysMatrix[i1] + "-" + i2 + "-5 p").innerHTML;
                pointerOClock = !pointerOClock;
            };
        ;}
    };
};
readMatrix();

// ---------- Read values ---------- //

function getWeek(selDay) {
    var oneJanuary = new Date(selDay.getFullYear(), 0, 1);
    return Math.ceil((((selDay - oneJanuary) / 86400000) + oneJanuary.getDay() + 1) / 7);
}
function initTimetable(selDay){
    for (var iw = 0; iw <=6; iw++){
        var cleanID = "week-" + daysMatrix[iw];
        document.getElementById(cleanID).classList.remove("current-day");
        document.getElementById(cleanID + "-timetable").classList.remove("current-timetable");
    }   
    var setID = "week-" + daysMatrix[(weekDay(selDay.getDay()) - 1)] ;
    document.getElementById(setID).classList.add("current-day")
    document.getElementById(setID + "-timetable").classList.add("current-timetable");
    document.getElementById("week-n").innerHTML = getWeek(selDay);
    for (var iw = 0; iw <= 6; iw++) {
        document.getElementById(daysMatrix[iw] + "-n").innerHTML = document.querySelector(activeDay[2] + ' .cal-' + (iw + 1) + '-' + activeDay[1] + ' p').innerHTML;
    }   
};
initTimetable(today);

// ---------- Over Selection ---------- //
function overSelect(hour, half) {
    if (half == 0) {
        for (var it = 0; it < 5; it++) {
            document.querySelector("#" + daysMatrix[it] + "-" + hour).classList.add("time-cell-over");}
    }
    if (half == 5) {
        for (var it = 0; it < 5; it++) {
            document.querySelector("#" + daysMatrix[it] + "-" + hour + "-5").classList.add("time-cell-over");}
    }
};
function overDeselect(hour, half) {
    if (half == 0) {
        for (var it = 0; it < 5; it++) {
            document.querySelector("#" + daysMatrix[it] + "-" + hour).classList.remove("time-cell-over");}
    }
    if (half == 5) {
        for (var it = 0; it < 5; it++) {
            document.querySelector("#" + daysMatrix[it] + "-" + hour + "-5").classList.remove("time-cell-over");}
    }
};
