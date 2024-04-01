/**
 * ===================== PRINCIPAIS OBJETOS  =================================
 */


 let addNote = document.querySelector('#add-note');//Botão de para adicionar nota
 let btnCloseModal =  document.querySelector('#btn-close-modal'); //fechar janela modal com os detalhes da nota.
 let modal = document.querySelector('#modal'); //Modal para edição das notas
 let modalView = document.querySelector('#modal-view'); //Modal para exibição dos detalhes da nota
 let notesContainer = document.querySelector('#notes');//Lista divs com dados das notas
 let btnSaveNote = document.querySelector("#btn-save-note"); //icone para salvar nota
 let btnCloseNote = document.querySelector("#close-modal-view");//icone para fechar modal de edição de nota.
 let inputTitle = document.querySelector('#input-title'); // campo de entrada do título
 let inputContent = document.querySelector('#input-content'); // campo de entrada do conteúdo
 let deleteButton = document.querySelector('#delete-modal-view');
 
 
 /*deleteButton.addEventListener('click', (evt) => {
     evt.preventDefault();
 
 
 }) */
 
 
 addNote.addEventListener('click', (evt) => {
     evt.preventDefault();
     modal.style.display='block';
     document.querySelector('#notes').style.display='none';
     document.querySelector('#controls').style.display='none';
 });
 
 
 btnCloseModal.addEventListener('click', (evt) => {
     evt.preventDefault();
     modal.style.display = 'none';
     addNote.style.display = 'block';
     notesContainer.style.display = 'flex';
     document.querySelector('#controls').style.display = 'flex';
     clearInputFields();
 });
 
 
 btnSaveNote.addEventListener('click', (evt) => {
     evt.preventDefault();
     let data = {
         id: document.querySelector('#input-id').value,
         title: inputTitle.value,
         content: inputContent.value,
     };
 
 
     saveNote(data);
     modal.style.display = 'block';
     addNote.style.display = 'block';

     document.querySelector('#controls').style.display = 'flex';
     clearInputFields();
 
 
     listNotes();
 });
 
 
 btnCloseNote.addEventListener('click', (evt) => {
     evt.preventDefault();
     modal.style.display='none';
     addNote.style.display = 'block';
     notesContainer.style.display = 'flex';
     modalView.style.display = 'none';
     clearInputFields();
 });
 
 
 /**
  * ===================== FUNÇÕES  =================================
  */
 
 
 const saveNote = (note) => {
     let notes = loadNotes();
     note.lastTime = new Date().getTime(); //add em aula
     if (note.id.trim().length < 1) {
         note.id = new Date().getTime();
         notes.push(note); //add em aula
         document.querySelector('#input-id').value = note.id; //add em aula
     } else { //add em aula
         notes.forEach((item, i) => {
             if (item.id == note.id) {
                 notes[i] = note;
             }
         });
     }
     //note.lastTime = new Date().getTime(); --mudou de lugar
     //notes.push(note); --mudou de lugar
     notes = JSON.stringify(notes);
     localStorage.setItem('notes', notes);
 };
 
 
 const loadNotes = () => {
     let notes = localStorage.getItem('notes');
     if (!notes) {
         notes = [];
     } else {
         notes = JSON.parse(notes);
     }
     return notes;
 };
 
 
 const listNotes = () => {
     notesContainer.innerHTML = '';
     let listNotes = loadNotes();
     listNotes.forEach((note) => {
         let divCard = document.createElement('div');
         divCard.className = 'card';
         divCard.style.width = '25rem';
         let divCardBody = document.createElement('div');
         divCardBody.className = 'card-body';
         divCard.appendChild(divCardBody);
         //titulo
         let h5 = document.createElement('h5');
         h5.innerText = note.title;
         divCardBody.appendChild(h5);
         //conteudo
         let pContent = document.createElement('p');
         pContent.innerText = note.content;
         //data
         let pLastTime = document.createElement('p');
         let time = new Date(note.lastTime);//converte p data
         time = time.toLocaleDateString('pt-BR');
         pLastTime.innerText = "Atualizado em: " + time;
         divCardBody.appendChild(pContent);
         divCardBody.appendChild(pLastTime);
 
 
         notesContainer.appendChild(divCard);
 
 
         divCard.addEventListener('click', (evt) => {
             showNote(note);
         });
     });
 };
 
 
 const showNote = (note) => {
     notesContainer.style.display = 'none';
     addNote.style.display = 'none';
     modalView.style.display = 'block';
     document.querySelector('#title-note').innerHTML = "<h1>" + note.title + "</h1>";
     document.querySelector('#content-note').innerHTML =
         `<p>${note.content}</p>
         <p>Última alteração: ${dateFormat(note.lastTime)}</p>`;
        
         //botão ediçÃO
         let divEdit = document.createElement("div");
         let iEdit = document.createElement("i");
         iEdit.className = "bi bi-pen";
         divEdit.appendChild(iEdit);
         document.querySelector("#controls-note").appendChild(divEdit);
         divEdit.addEventListener("click",(evt) =>{
             evt.preventDefault();
             document.querySelector("#input-id").value = note.id;
         });
 
         //botão remove
         let divRemove = document.createElement("div");
         let iRemove = document.createElement("i");
         iRemove.className = "bi bi-trash3";
         divRemove.appendChild(iRemove);
         document.querySelector("#controls-note").appendChild(divRemove);
         divRemove.addEventListener("click",(evt) =>{
             evt.preventDefault();
             document.querySelector("#input-id").value = note.id;
         });

     };

 //const edição

 /*const deleteButton = (note) => {
 
 
 };*/
 
 
 const dateFormat = (timestamp) => {
     let date = new Date(timestamp);
     date = date.toLocaleDateString('pt-BR');
     return date;
 };
 
 
 const clearInputFields = () => {
     inputTitle.value = '';
     inputContent.value = '';
 };
 
 
 listNotes();
 
 
 
 