
// on start up
sendRequest("GET");
//addNew();

function addNew() {
    sendRequest("POST", { "text": "Another new thing" });
}



function sendRequest(type, data) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var parsedToDos = JSON.parse(this.responseText);
            console.log(parsedToDos);
        }
        else if (this.readyState == 4) { //this means this.status isn't 200
            console.log(this.responseText);
        }
    }
    
    xhttp.open(type, "https://cse204.work/todos", true);
    xhttp.setRequestHeader("x-api-key", "82436b-8c4f08-848b4a-ef5e67-b1bebb");

    if (data != null) { // POST
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(data));
    }
    else { // GET
        xhttp.send();
    }
}
