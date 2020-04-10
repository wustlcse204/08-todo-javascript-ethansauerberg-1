sendRequest("GET");

function onLoad() {
    sendRequest("GET");
}


var arrayOfDeletes = document.getElementsByClassName("ToDoItemDelete");
console.log(arrayOfDeletes);
/* for (var i = 0; i < arrayOfDeletes.length; ++i) {
    console.log("adding event listener #" + i);
    arrayOfDeletes[i].addEventListener("click", function () {
        console.log("delete request called");
        sendRequest("DELETE", null, arrayOfDeletes[i].id);
    })
}*/
console.log(arrayOfDeletes[1]);
arrayOfDeletes[1].addEventListener("click", function (event) {
    event.preventDefault();
    sendRequest("DELETE", null, arrayOfDeletes[1].id);
})


// need to fix error with only submitting half the time
var addForm = document.getElementById("addForm");
addForm.addEventListener("submit", function () {
    var name = addForm.elements["caption"].value;
    sendRequest("POST", { "text": name });
    sendRequest("GET");
});



function sendRequest(type, data, id) {
    console.log("request of type " + type + " with data " + data);
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
        var toDoItem = document.createElement("div");
        
        toDoItem.innerHTML = '<div class="toDoItem"><form><input type="checkbox" class="toDoItemCheckbox">';
        toDoItem.innerHTML += '<span class="toDoItemCaption">' + parsedToDos[i].text + '</span>';
        toDoItem.innerHTML += '<button class="ToDoItemDelete">X</button></form></div>';

        listOfToDos.appendChild(toDoItem);

        toDoItem.setAttribute("display", "inline");
        toDoItem.setAttribute("margin", "5px");
        toDoItem.setAttribute("vertical-align", "middle");
        toDoItem.setAttribute("border", "2px solid red");
        document.getElementById("title").setAttribute("border", "2px solid red");
        ++i;

    }
}