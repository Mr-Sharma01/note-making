console.log("hello world");
showNotes();
// if user adds note, add it to local storage

let addnote = document.getElementById('addnote');
addnote.addEventListener("click", function () {

    let txt = document.getElementById('txt');
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(txt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    txt.value = "";
    showNotes();
});

// function to show the notes from local storage

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
    <div class="notecard my-2 mx-2 card"  style="width: 18rem;">
      <div class="card-body">
      <h5 class="card-title">Note ${index + 1}</h5>
      <p class="card-text"> ${element}</p>
      <button id = "${index}" onclick = "deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
      </div> 
      </div> `;
    });
    let notesElm = document.getElementById('notes');
    if (notesObj.lenght != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing is there`;
    }
}

//function to delete the notes

function deleteNote(index){
    let notes = localStorage.getItem("notes");
    // if (notes == null) {
    //   notesObj = [];
    // } else {
    //   notesObj = JSON.parse(notes);
    // }
    notesObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

//function to search element form notecard

let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){
    let inputVal = search.value.toLowerCase();
    let notecard = document.getElementsByClassName('notecard');
    Array.from(notecard).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
        element.style.display = "block";
        } else {
        element.style.display = "none";
        }
    })
})
