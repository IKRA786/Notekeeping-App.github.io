//If user add the notes add it to local storage
shownotes();
let addbtn=document.getElementById('addbtn');
addbtn.addEventListener("click",function(e)
{
    let addTxt=document.getElementById('addTxt');
    let notes=localStorage.getItem('notes');
    if(notes==null)
    {
        notesObj=[];
    }
    else
    {
        notesObj=JSON.parse(notes)
    }
    let Obj={
       title:addtitle.value,
       text:addTxt.value,
    }
    notesObj.push(Obj);
    localStorage.setItem('notes',JSON.stringify(notesObj));
    addTxt.value=" ";
    addtitle.value=" ";
    shownotes();

})
function shownotes()
{
    let notes=localStorage.getItem('notes');
    if(notes==null)

        {
            notesObj=[]
        }
        else{
            notesObj=JSON.parse(notes);
        }
        let html=" "
        notesObj.forEach(function(element,index){

            html +=`<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">${element.title}</h5>
              <p class="card-text">${element.text}</p>
              <button id="${index}" onclick="return confirmdelete(this.id);" class="btn btn-primary">Delete Note</button>
           
            </div>
          </div>`

        })
        let notesElm=document.getElementById('notes');
        if(notesObj.length!=0)
        {
            notesElm.innerHTML=html;
        }
        else{
            notesElm.innerHTML='Nothing to show! Use "Add Notes" section above to add notes';
        }
   
}
function deleteNote(index) {
    
      let notes = localStorage.getItem("notes");
      if (notes == null) {
        notesObj = [];
      } 
      else {
        notesObj = JSON.parse(notes);
      }
    
      notesObj.splice(index, 1);
      localStorage.setItem("notes", JSON.stringify(notesObj));
      shownotes();
    }
    function confirmdelete(vertex)
    {
        var x=confirm("Are you sure you want to delete");
        if(x)
        {
            deleteNote(vertex);
        }
        else
        {
            return false;
        }
       
    }
    
    let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })
})