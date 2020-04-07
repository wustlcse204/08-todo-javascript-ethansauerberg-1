
// on start up
var xhttp = new XMLHttpRequest();
xhttp.open("GET", "https://cse204.work/todos", true)
xhttp.send()


xhttp.setRequestHeader("x-api-key", "82436b-8c4f08-848b4a-ef5e67-b1bebb");


function addNew() {
  
    if(this.readyState == 4 && this.status == 200) {
        
    }
    return xhttp.open("POST", "https://cse204.work/todos", true)
}

function sendRequest (type) {
    var xhttp = new XMLHttpRequest;
    xhttp.open(type, "https://cse204.work/todos");
    xhttp.responseType = 'json';
    xhttp.onload = function () {
        var response = xhttp.response;
    }
}

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var fakeName = JSON.parse(this.responseText);
      console.log(fakeName);
      displayFakeName(fakeName.name);
    }
};
  xhttp.open("GET", url, true);
