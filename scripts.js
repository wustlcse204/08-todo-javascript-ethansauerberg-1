sendRequest("GET");

function onLoad() {
    sendRequest("GET");
}


var arrayOfDeletes = document.getElementsByClassName("ToDoItemDelete");
for (var i; i < arrayOfDeletes.length; ++i) {
    console.log("adding event listener #" + i);
    arrayOfDeletes[i].addEventListener("click", function () {
        console.log("delete request called");
        sendRequest("DELETE", null, arrayOfDeletes[i].id);
    })
}

// need to fix error with only submitting half the time
var addForm = document.getElementById("addForm");
addForm.addEventListener("submit", function () {
    var name = addForm.elements["caption"].value;
    sendRequest("POST", { "text": name });
    sendRequest("GET");
});



function sendRequest(type, data, id) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var parsedToDos = JSON.parse(this.responseText);
            //console.log(parsedToDos);
            if (type == "GET") {
                appendToDos(parsedToDos);
            }
        }
        else if (this.readyState == 4) { //this means this.status isn't 200 (error)
            console.log("Error - bad ready state. Response was: " + this.responseText);
        }
    }
    var url = "https://cse204.work/todos";
    if(id != null){
        url += id;
    }    
    xhttp.open(type, url, true);
    xhttp.setRequestHeader("x-api-key", "82436b-8c4f08-848b4a-ef5e67-b1bebb");

    if (type == "POST") {
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(data));
    }
    else if (type == "GET" || type == "DELETE") {
        xhttp.send();
    }
}


function appendToDos(parsedToDos) {
    var i = 0;
    var listOfToDos = document.getElementById("listOfToDos");
    while (parsedToDos[i] != null) {
        var newItem = document.createElement("div");
        newItem.innerHTML = '<div class="toDoItem"><form><input type="checkbox" class="toDoItemCheckbox">';
        newItem.innerHTML += '<span class="toDoItemCaption">' + parsedToDos[i].text + '</span>';
        newItem.innerHTML += '<form><input type="button" class="ToDoItemDelete" value="X"></div>';

        listOfToDos.appendChild(newItem);

        newItem.setAttribute("display", "inline");
        newItem.setAttribute("margin", "5px");
        newItem.setAttribute("vertical-align", "middle");
        //console.log(parsedToDos[i]);
        ++i;

    }
}