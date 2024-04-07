/**
 * ===================== PRINCIPAIS OBJETOS  =================================
 */

let addNote = document.querySelector('#add-note'); // Botão para adicionar nota
let btnCloseModal = document.querySelector('#btn-close-modal'); // Botão para fechar janela modal
let modal = document.querySelector('#modal'); // Modal para edição das notas
let modalView = document.querySelector('#modal-view'); // Modal para exibição dos detalhes da nota
let notesContainer = document.querySelector('#notes'); // Container de notas
let btnSaveNote = document.querySelector("#btn-save-note"); // Botão para salvar nota
let btnCloseNote = document.querySelector("#close-modal-view"); // Botão para fechar modal de edição de nota
let inputTitle = document.querySelector('#input-title'); // Campo de entrada do título
let inputContent = document.querySelector('#input-content'); // Campo de entrada do conteúdo
let deleteButton = document.querySelector('#delete-modal-view'); // Botão para deletar nota

addNote.addEventListener('click', (evt) => {
    evt.preventDefault();
    modal.style.display = 'block';
    notesContainer.style.display = 'none';
    document.querySelector('#controls').style.display = 'none';
    // Limpa o campo de ID para garantir que uma nova nota seja criada
    document.querySelector('#input-id').value = '';
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
    modal.style.display = 'none';
    notesContainer.style.display = 'flex';
    document.querySelector('#controls').style.display = 'flex';
    clearInputFields();
    listNotes();
});

btnCloseNote.addEventListener('click', (evt) => {
    evt.preventDefault();
    modal.style.display = 'none';
    addNote.style.display = 'block';
    notesContainer.style.display = 'flex';
    modalView.style.display = 'none';
    clearInputFields();
});

 /* ===================== FUNÇÕES  =================================
 */

const saveNote = (note) => {
    let notes = loadNotes();
    note.lastTime = new Date().getTime();
    if (note.id.trim().length < 1) {
        note.id = new Date().getTime();
        notes.push(note);
        document.querySelector('#input-id').value = note.id;
    } else {
        let index = notes.findIndex(item => item.id == note.id);
        if (index !== -1) {
            notes[index] = note;
        }
    }
    localStorage.setItem('notes', JSON.stringify(notes));
    listNotes(); 
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
 
        let h5 = document.createElement('h5');
        h5.innerText = note.title;
        divCardBody.appendChild(h5);
       
        let pContent = document.createElement('p');
        pContent.innerText = note.content;
     
        let pLastTime = document.createElement('p');
        let time = new Date(note.lastTime);
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
    modalView.style.display = 'block';
    document.querySelector('#title-note').innerHTML = "<h1>" + note.title + "</h1>";
    document.querySelector('#content-note').innerHTML =
        `<p>${note.content}</p>
        <p>Última alteração: ${dateFormat(note.lastTime)}</p>`;

    document.querySelector("#controls-note").innerHTML = '';

    // Edit button
    let divEdit = document.createElement("div");
    let iEdit = document.createElement("i");
    iEdit.className = "bi bi-pen";
    divEdit.appendChild(iEdit);
    document.querySelector("#controls-note").appendChild(divEdit);
    divEdit.addEventListener("click", (evt) => {
        evt.preventDefault();
        console.log("Edit button clicked for note:", note);
        editNote(note.id);
    });

    // Delete button
    let divRemove = document.createElement("div");
    let iRemove = document.createElement("i");
    iRemove.className = "bi bi-trash3";
    divRemove.appendChild(iRemove);
    document.querySelector("#controls-note").appendChild(divRemove);
    divRemove.addEventListener("click", (evt) => {
        evt.preventDefault();
        if (confirm("Tem certeza que deseja excluir essa nota?")) {
            removeNoteById(note.id);
            listNotes();
            clearInputFields();
        }
    });
};

const editNote = (id) => {
    console.log("Editing note with ID:", id);
    let notes = loadNotes();
    let note = notes.find(note => note.id == id);

    document.querySelector('#input-id').value = note.id;
    document.querySelector('#input-title').value = note.title;
    document.querySelector('#input-content').value = note.content;

    modal.style.display = 'block';
    document.querySelector('#notes').style.display = 'none';
    document.querySelector('#controls').style.display = 'none';

    modalView.style.display = 'none';
};

const removeNoteById = (id) => {
    let notes = loadNotes();
    notes = notes.filter((note) => note.id != id);
    localStorage.setItem('notes', JSON.stringify(notes));
};

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
