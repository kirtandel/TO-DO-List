let form = document.getElementById("form1");
let TODO = document.getElementById("TODO");
let PROCESS = document.getElementById("PROCESS");
let DONE = document.getElementById("DONE");

// -----------dragging-------------

let draggingElementt = null;

function calldragstart(e) {
    draggingElementt = e.currentTarget;
};

// ------------------------------
TODO.addEventListener("dragover", (e) => {
    if (draggingElementt.parentNode.id === e.currentTarget.id) {
        return;
    }
    e.preventDefault();
});
PROCESS.addEventListener("dragover", (e) => {
    if (draggingElementt.parentNode.id === e.currentTarget.id) {
        return;
    }
    e.preventDefault();
});
DONE.addEventListener("dragover", (e) => {
    if (draggingElementt.parentNode.id === e.currentTarget.id) {
        return;
    }
    e.preventDefault();
});
// ------------------------------

// ------------------------------
TODO.addEventListener("drop", (e) => {
    e.currentTarget.append(draggingElementt);
});
PROCESS.addEventListener("drop", (e) => {
    e.currentTarget.append(draggingElementt);
});
DONE.addEventListener("drop", (e) => {
    e.currentTarget.append(draggingElementt);
});

// ------------------------------

let employees = {};

let editpopup = document.getElementById("popp");
let closepopup = document.getElementById("close-icon");
let updatedid = null;

closepopup.addEventListener("click", (e) => {
    editpopup.classList.toggle("hide");
    editpopup.classList.toggle("show");
});

let preform = document.getElementById("form2")
function prefillform(data) {
    for (let property in data) {
        preform[property] && (preform[property].value = data[property]);
    }
}


function editrow(e) {
    let employeeId = e.target.parentNode.parentNode.id;
    updatedid = employeeId;
    editpopup.classList.toggle("hide");
    editpopup.classList.toggle("show");
    prefillform(employees[employeeId]);
}

function deleterow(e) {
    e.target.parentNode.parentNode.remove();
}

let newid = 1;
function generateid() {
    return newid++;
};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let taskstatus = form.status.value;
    let data =
    {
        topic: form.topic.value,
        date: form.date.value,
        id: generateid()
    };


    employees[data.id] = data;

    let card = document.createElement("div");
    card.className = "main-div";
    card.id = `${data.id}`;
    card.draggable = true;
    card.addEventListener("dragstart", calldragstart);
    
    let carddiv = document.createElement("div")
    carddiv.classList.add("topic-name");

    let topicheading = document.createElement("h4");
    topicheading.innerText = `${data.topic}`;

    let duedate = document.createElement("h6");
    duedate.innerText = `Due-Date:- ${data.date}`;

    let id = document.createElement("h6");
    id.innerText = `Id:- ${data.id}`;


    carddiv.append(topicheading, duedate, id);

    // ---iconbuttons--------

    let divicons = document.createElement("div");
    divicons.classList.add("icon-div");

    let deletebutton = document.createElement("span");
    deletebutton.classList.add("material-icons");
    deletebutton.innerText = "delete";
    deletebutton.addEventListener("click", deleterow);


    divicons.append(deletebutton);

    card.append(carddiv, divicons);

    let goto = document.getElementById(taskstatus);
    goto.append(card);
    form.reset();

});

preform.addEventListener("submit", (e) => {
    e.preventDefault();


    let updateemployee =
    {
        topic: preform.topic.value,
        date: preform.date.value,
        id: updatedid
    };

    employees[updatedid] = updateemployee;
    
    editpopup.classList.toggle("hide");
    editpopup.classList.toggle("show");
    
    let record = document.getElementById(updatedid);
    record.innerHTML =
    `
        <div class="topic-name">
            <h4>${updateemployee.topic}</h4>
            <h6>Due-Date:-${updateemployee.date}</h6>
            <h6>Id:- ${updateemployee.id}</h6>
        </div>
        <div class="icon-div">
            <span class="material-icons">edit</span>
            <span class="material-icons">delete</span>
        </div> `;

        
    

    preform.reset();

});
