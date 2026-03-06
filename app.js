const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzk4qhvqpu9wmBoeBSmXL6O5ZDDWjIEx9QqBHRZH4BHdXXDEE9kANDnye4jQ-RDca5uwQ/exec";

function submitVisit(){

navigator.geolocation.getCurrentPosition(function(pos){

let formData = new FormData();

formData.append("agent", document.getElementById("agent").value);
formData.append("type", document.getElementById("type").value);
formData.append("shop", document.getElementById("shop").value);
formData.append("mobile", document.getElementById("mobile").value);
formData.append("area", document.getElementById("area").value);
formData.append("pincode", document.getElementById("pincode").value);
formData.append("note", document.getElementById("note").value);

formData.append("lat", pos.coords.latitude);
formData.append("lng", pos.coords.longitude);

fetch(SCRIPT_URL,{
method:"POST",
body:formData
})
.then(r=>r.text())
.then(data=>{
document.getElementById("status").innerText="Submitted";
});

});
}
