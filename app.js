const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyGJEt_ckS-4A_5j65N_Eka-R1_Ujxa8wUgwXOdeM2GCKdfwHlXC4iiZRROpuIm9DyzdA/exec";

function submitVisit(){

  const agent = document.getElementById("agent")?.value || "Agent";
  const type = document.getElementById("type").value;
  const shop = document.getElementById("shop").value;
  const mobile = document.getElementById("mobile").value;
  const area = document.getElementById("area").value;
  const pincode = document.getElementById("pincode").value;
  const note = document.getElementById("note").value;
  const photoInput = document.getElementById("photo");

  if(!shop || !mobile){
    alert("Shop name and mobile required");
    return;
  }

  navigator.geolocation.getCurrentPosition(function(position){

    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    const file = photoInput.files[0];

    if(file){

      const reader = new FileReader();

      reader.onload = function(e){

        const base64 = e.target.result.split(',')[1];

        sendData(agent,type,shop,mobile,area,pincode,note,lat,lng,base64);

      };

      reader.readAsDataURL(file);

    } else {

      sendData(agent,type,shop,mobile,area,pincode,note,lat,lng,"");

    }

  }, function(){
    alert("Location permission required");
  });

}


function sendData(agent,type,shop,mobile,area,pincode,note,lat,lng,photo){

  const formData = new FormData();

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
    body:formData,
    mode:"no-cors"
  })
  .then(()=>{

    document.getElementById("status").innerText="Submitted Successfully";

  })
  .catch(()=>{

    alert("Submission failed");

  });

}
