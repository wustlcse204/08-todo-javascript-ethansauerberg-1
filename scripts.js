
// on start up
onLoad();
//addNew();
function onLoad() {
    sendRequest("GET");
}

var addForm = document.getElementById("addForm");
addForm.addEventListener("submit", function(){
   // var toDoName = {text: addForm.};
   console.log("2");
    var name = addForm.elements["caption"].value;
    console.log("1");
    sendRequest("POST", { "text": name});
    sendRequest("GET");
});


function sendRequest(type, data) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var parsedToDos = JSON.parse(this.responseText);
            console.log(parsedToDos);
            if(type == "GET") {
                var i = 0;
                var listOfToDos = document.getElementById("listOfToDos");
                while(parsedToDos[i] != null) {
                    var newItem = document.createElement("div");
                    newItem.innerHTML = "";
                    newItem.innerHTML += '<div class="toDoItem">';
                    newItem.innerHTML += '<form><input type="checkbox" class="toDoItemCheckbox"></form>';
                    newItem.innerHTML += '<span class="toDoItemCaption">' + parsedToDos[i].text + '</span>';
                    newItem.innerHTML += '<form><input type="button" class="ToDoItemDelete" value="X"></form>';
                    newItem.innerHTML += '</div>';

                    listOfToDos.appendChild(newItem);
                    //console.log(parsedToDos[i]);
                    ++i;
                    
                }
            }
        }
        else if (this.readyState == 4) { //this means this.status isn't 200 (error)
            console.log(this.responseText);
        }
    }
    
    xhttp.open(type, "https://cse204.work/todos", true);
    xhttp.setRequestHeader("x-api-key", "82436b-8c4f08-848b4a-ef5e67-b1bebb");

    if (type == "POST") {
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(data));
    }
    else if (type == "GET") { 
        xhttp.send();
    }
}
