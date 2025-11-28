document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector('.container-grid');
    const ref = document.querySelector('.container-main');

    const timetable = {
        "Mon": [
            {"time": "10:00-11:00", "course" : "ENR203 S-1"},
            {"time": "11:00-12:30", "course" : "FAC114 S-1"},
            {"time": "13:00-14:30", "course" : "ENR305 S-2"},
        ],
        "Tue": [
            {"time": "10:00-11:00", "course": "ENR200 S-1"},
            {"time": "14:00-15:00", "course": "ECE100 S-2"},
            {"time": "15:00-16:00", "course": "ENR200 S-1"}
        ],
        "Wed": [
            {"time": "08:00-10:00", "course": "ECE100 S-2"},
            {"time": "10:00-11:00", "course": "FAC114 S-1"},
            {"time": "11:00-12:30", "course": "ENR203 S-1"},
        ],
        "Thu": [
            {"time": "10:00-11:00", "course": "ENR200 S-1"},
            {"time": "14:00-15:00", "course": "ENR200 S-1"},
            {"time": "15:00-16:00", "course": "ENR305 S-2"},
        ],
        "Fri": [
            {"time": "10:00-11:00", "course": "ENR200 S-1"},
            {"time": "14:00-15:00", "course": "ENR200 S-1"}
        ],
        "Sat": [],
        "Sun": []
    };

    const colours = [
        "#8bbba2",
        "#b488df",
        "#f77650",
        "#f2b699",
        "#b15a59",
        "#d0b7e8",
        "#f5ceb4",
        "#8b5a59",
    ];

    const divs = [
        {"className":"", "data":"", "row": 1, "col": 1, "row1":2, "col1":2},
        {"className":"days", "data":"Mon", "row": 1, "col": 2, "row1":2, "col1":3},
        {"className":"days", "data":"Tue", "row": 1, "col": 3, "row1":2, "col1":4},
        {"className":"days", "data":"Wed", "row": 1, "col": 4, "row1":2, "col1":5},
        {"className":"days", "data":"Thu", "row": 1, "col": 5, "row1":2, "col1":6},
        {"className":"days", "data":"Fri", "row": 1, "col": 6, "row1":2, "col1":7},
        {"className":"days", "data":"Sat", "row": 1, "col": 7, "row1":2, "col1":8},
        {"className":"days", "data":"Sun", "row": 1, "col": 8, "row1":2, "col1":9}
    ];

    var coursesToColour = {};
    var edges = [];
    var courses = [];


    for (const key in timetable) {
        timetable[key].map((item) => {
            edges.push(item.time.split("-")[0]);
            edges.push(item.time.split("-")[1]);
            courses.push(item.course);
        });
    }

    edges = [...new Set(edges)];
    edges = edges.sort();
    courses = [...new Set(courses)];

    courses.forEach((course,i) => {
        coursesToColour[course] = colours[i];
    });

    edges.forEach((edge,i) => {
        divs.push({"className":"time" ,"data":edge, "row": i+2, "col": 1, "row1":i+3, "col1":2});
    });

    var i = 2;
    for (const key in timetable) {
        timetable[key].map((item) => {
            let temprow1 = edges.indexOf(item.time.split("-")[0]);
            let temprow2 = edges.indexOf(item.time.split("-")[1]);
            divs.push({"className":"grid-item" ,"data":item.course, "row": temprow1+2, "col": i, "row1":temprow2+2, "col1": i+1, "backgroundColor": coursesToColour[item.course]});
        });
        i++;
    }

    divs.forEach((div) => {
        const divElement = document.createElement('div');
        divElement.className = div.className;
        divElement.style.gridArea = `${div.row}/${div.col}/${div.row1}/${div.col1}`;
        divElement.style.backgroundColor = div.backgroundColor;
        divElement.textContent = div.data;
        container.appendChild(divElement);
    });
    document.documentElement.style.setProperty('--lineWidth', ref.offsetWidth-60 + 'px');

    ref.style.gridTemplateRows = `25px repeat(${edges.length},1fr)`;
});
