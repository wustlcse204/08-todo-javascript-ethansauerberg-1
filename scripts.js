refreshList();

function refreshList() {
    sendRequest("GET");
}


var submitButton = document.getElementById("submitButton");
submitButton.addEventListener("click", function () {
    event.preventDefault();
    var name = document.getElementById("inputText").value;
    sendRequest("POST", { "text": name });
    name.value == "";
    refreshList();
});



function sendRequest(type, data) {
    console.log("request of type '" + type + "' with data '" + data + "'");
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // console.log(this.responseText);
            if (type == "GET") {
                var parsedToDos = JSON.parse(this.responseText);
                appendToDos(parsedToDos);
                console.log(parsedToDos);
            }
            else if (type == "DELETE" || type == "PUT") {
                console.log("Response text to request of type '" + type + "' with data '" + data + "': " + this.responseText);
                refreshList();
            }
        }
        else if (this.readyState == 4) { //this means this.status isn't 200 (error)
            console.log("Error - bad ready state. Response was: " + this.responseText);
        }
    }

    var url = "https://cse204.work/todos";
    if (type == "DELETE" || type == "PUT") {
        url += "/" + event.target.parentNode.id;
    }

    xhttp.open(type, url, true);
    xhttp.setRequestHeader("x-api-key", "82436b-8c4f08-848b4a-ef5e67-b1bebb");

    if (type == "POST" || "PUT") {
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
    listOfToDos.innerHTML = "";
    while (parsedToDos[i] != null) {
        var toDoItem = document.createElement("div");

        listOfToDos.appendChild(toDoItem);

        var caption = document.createElement("span");
        caption.innerText = parsedToDos[i].text;
        toDoItem.appendChild(caption);
        var checkButton = document.createElement("button");
        toDoItem.appendChild(checkButton);
        var deleteButton = document.createElement("button");
        toDoItem.appendChild(deleteButton);

        checkButton.innerText = "Mark Done";
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", function () {
            sendRequest('DELETE');
        });
        checkButton.addEventListener("click", function () {
            console.log("sending request to mark item done");
            sendRequest('PUT', "{'completed':true}");
        });
    
        toDoItem.setAttribute("id", parsedToDos[i].id);

        toDoItem.className = "toDoItem";
        checkButton.className = "toDoItemCheckbox";
        deleteButton.className = "toDoItemDelete"

        if(parsedToDos[i].completed == true) {
            console.log("Found a completed to-do item");
            caption.setAttribute("text-decoration", "line-through");
        }
        ++i;
    }
}