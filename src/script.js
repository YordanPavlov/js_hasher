//selecting all required elements
const dropArea = document.querySelector(".drag-area"),
dragText = dropArea.querySelector("header"),
button = dropArea.querySelector("button"),
input = dropArea.querySelector("input");
let file; //this is a global variable and we'll use it inside multiple functions

button.onclick = ()=>{
  input.click(); //if user click on the button then the input also clicked
}

input.addEventListener("change", function(){
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = this.files[0];
  dropArea.classList.add("active");
  showFile(); //calling function
});


//If user Drag File Over DropArea
dropArea.addEventListener("dragover", (event)=>{
  event.preventDefault(); //preventing from default behaviour
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload File";
});

//If user leave dragged File from DropArea
dropArea.addEventListener("dragleave", ()=>{
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
});

//If user drop File on DropArea
dropArea.addEventListener("drop", (event)=>{
  event.preventDefault(); //preventing from default behaviour
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = event.dataTransfer.files[0];
  showFile(); //calling function
});

function printHash(hashBuffer) {
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // Generate a random is present or not value based on the last byte of the hash
  const isPresent = hashArray[hashArray.length - 1] % 2 === 0;

    // convert bytes to hex string
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  const hexPlusPresentResult = isPresent ? hashHex.concat("<br/> <font color=\"green\">Is a valid document</font> ")
  : hashHex.concat( "<br/> <font color=\"red\">Is NOT a valid document</font>");

  dropArea.innerHTML = hexPlusPresentResult;
}

function showFile(){
  let fileType = file.type; //getting selected file type
  let fileReader = new FileReader(); //creating new FileReader object
  fileReader.onload = ()=>{
    let fileData = fileReader.result; //passing user file source in fileURL variable
    crypto.subtle.digest('SHA-256', fileData).then(hashBuffer => {
      printHash(hashBuffer)
    })
    //let imgTag = `<img src="${fileURL}" alt="">`; //creating an img tag and passing user selected file source inside src attribute
    //dropArea.innerHTML = imgTag; //adding that created img tag inside dropArea container
  }
  fileReader.readAsArrayBuffer(file);
}
