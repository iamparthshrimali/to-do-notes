let search = document.getElementById("list");
let serchInput = document.querySelector("#searchInput");

// document.querySelector("#search p").addEventListener("click", () => {
//   serchInput.focus();
// });

searchInput.addEventListener("focus", (e) => {
  search.classList.add("change");
});

searchInput.addEventListener("focusout", (e) => {
  search.classList.remove("change");
  serchInput.value = "";
  searchFromNote();
  if(noteObject.length!=0)
  {
    deleteAllBtn.style.display = "block";
  }
});

let notes = document.querySelector(".notes-container .notes");

searchInput.addEventListener("input", searchFromNote);

function searchFromNote() {
  if (localStorage.getItem("localNotes") != null) {
    noteObject = JSON.parse(localStorage.getItem("localNotes"));
  }
  let innerTextOfTitle;
  let innerTextofNote;
  let count=0;
  for (let i = 0; i < noteObject.length; i++) {
    innerTextOfTitle = notes
      .getElementsByClassName("note")
      [i].getElementsByTagName("h2")[0].innerText;
    innerTextofNote = notes
      .getElementsByClassName("note")
      [i].getElementsByTagName("p")[0].innerText;
    if (
      innerTextOfTitle.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      innerTextofNote.toLowerCase().includes(searchInput.value.toLowerCase())
    ) {
      notes.getElementsByClassName("note")[i].style.display = "block";
      count++;
    } else {
      notes.getElementsByClassName("note")[i].style.display = "none";
    }
  }
  if(count==0)
  {
    notes.style.border = "none";
   
  }
  deleteAllBtn.style.display = "none";
}

let addBtn = document.querySelector(".form-container #add-btn");

let noteObject = new Array();
let deleteAllBtn = document.querySelector(".notes-container .delete-all-btn");
showNotes();

let data = {};

/* Adding Notes */
addBtn.addEventListener("click", (e) => {
  let title = document.querySelector(".form-container .title");
  let note = document.querySelector(".form-container textarea");
  if (localStorage.getItem("localNotes") != null) {
    noteObject = JSON.parse(localStorage.getItem("localNotes"));
  }
  if (title.value == "") {
    alert("Title can't be empty");
    return;
  }
  data["title"] = title.value;
  data["note"] = note.value;
  data["id"] = noteObject.length;
  noteObject.push(data);
  localStorage.setItem("localNotes", JSON.stringify(noteObject));
  title.value = "";
  note.value = "";
  showNotes();
});

//Delete Note
function deleteNote(id) {
  if (confirm("Are you sure, you want to delete it?")) {
    if (localStorage.getItem("localNotes") != null) {
      noteObject = JSON.parse(localStorage.getItem("localNotes"));
      noteObject.splice(id, 1);
      localStorage.setItem("localNotes", JSON.stringify(noteObject));
    }
  }
  showNotes();
}

//Delete all

deleteAllBtn.addEventListener("click", (e) => {
  if (confirm("Do you really want to delete Everything?")) {
    localStorage.clear();
    noteObject = [];
  }
  showNotes();
});

function showNotes() {
  let title = document.querySelector(".form-container .title");
  let note = document.querySelector(".form-container textarea");
  html = "";
  if (localStorage.getItem("localNotes") != null) {
    let count = 0;
    noteObject = JSON.parse(localStorage.getItem("localNotes"));
    if (noteObject.length == 0) {
      html = "<h3>No Notes Here<h3>";
      notes.style.border = "none";
      deleteAllBtn.style.display = "none";
      notes.innerHTML = html;
      return;
    }
    noteObject.forEach(function (item) {
      title = item["title"];
      note = item["note"];
      html += `
         <div class="note">
           <h2 class="title">${title}</h2>
           <p class="text">${note}</p>
           <button class="btn delete-btn" id="${count}" onclick="deleteNote(this.id)">Delete Note</
           button>
        </div>
         `;
      count++;
    });
    notes.innerHTML = html;
    deleteAllBtn.style.display = "block";
    notes.style.border = "2px solid black";
  } else {
    html = "<h3>No Notes Here<h3>";
    notes.style.border = "none";
    deleteAllBtn.style.display = "none";
    notes.innerHTML = html;
    return;
  }
}

