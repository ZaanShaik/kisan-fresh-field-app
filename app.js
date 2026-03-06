const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyGJEt_ckS-4A_5j65N_Eka-R1_Ujxa8wUgwXOdeM2GCKdfwHlXC4iiZRROpuIm9DyzdA/exec";

function submitVisit(){

  let agent = document.getElementById("agent").value;
  let type = document.getElementById("type").value;
  let shop = document.getElementById("shop").value;
  let mobile = document.getElementById("mobile").value;
  let area = document.getElementById("area").value;
  let pincode = document.getElementById("pincode").value;
  let note = document.getElementById("note").value;
  let photoFile = document.getElementById("photo").files[0];

  if(!shop || !mobile){
    alert("Please fill required fields");
    return;
  }

  navigator.geolocation.getCurrentPosition(function(position){

    let lat = position.coords.latitude;
    let lng = position.coords.longitude;

    if(photoFile){

      let reader = new FileReader();

      reader.onload = function(e){

        let base64 = e.target.result.split(",")[1];

        sendData(agent,type,shop,mobile,area,pincode,note,lat,lng,base64);

      };

      reader.readAsDataURL(photoFile);

    } else {

      sendData(agent,type,shop,mobile,area,pincode,note,lat,lng,"");

    }

  });

}


function sendData(agent,type,shop,mobile,area,pincode,note,lat,lng,photo){

  let formData = new FormData();

  formData.append("agent",agent);
  formData.append("type",type);
  formData.append("shop",shop);
  formData.append("mobile",mobile);
  formData.append("area",area);
  formData.append("pincode",pincode);
  formData.append("note",note);
  formData.append("lat",lat);
  formData.append("lng",lng);
  formData.append("photo",photo);

  fetch(SCRIPT_URL,{
    method:"POST",
    body:formData
  })
  .then(res => res.text())
  .then(data => {

    document.getElementById("status").innerText = "Submitted Successfully";

  })
  .catch(err => {

    alert("Submission failed");

  });

}
