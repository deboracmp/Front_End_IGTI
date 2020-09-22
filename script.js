window.addEventListener('load', start);

var globalNames = ['Débora', 'Giuseppe', 'Giovanna', 'Thiago', 'Guilherme', 'João'];
var inputName = null;
var currentIndex = null;
var isEditing = false;

function start() {
    inputName = document.querySelector('.name_input');

    preventFormSubmit();
    activateInput();
    render();
       
}

function preventFormSubmit() {
    function handleFormSubmit(event) {
        event.preventDefault();
    }

    var form = document.querySelector('form');
    form.addEventListener('submit', handleFormSubmit);
    
}

function activateInput() {

    function insertName(newName) {
        globalNames.push(newName);
        console.log(globalNames);
    }

    function updateName(newName) {
        globalNames[currentIndex] = newName;
    }
    
    function handleTyping(event) {

        var hasText = !!event.target.value && event.target.value.trim() !== '';
        if (! hasText) {
            return;
        }
        if(event.key === 'Enter') {
            if(isEditing) {
                console.log('editando...');
                updateName(event.target.value);
            } 
            else {
                console.log('inserindo...');
                insertName(event.target.value);
            }
            render();
            isEditing = false;
        }
    }
    inputName.addEventListener('keyup', handleTyping);
    inputName.focus();
}

function render() {
    function createDeleteButton(index) {
        function deleteName() {
            globalNames.splice(index, 1);
            render();
        }
        let button = document.createElement('button');
        button.classList.add('delete-button');
        button.textContent = 'x';
        button.addEventListener('click', deleteName);
        return button;
    }
    
    function createSpan(name, index) {
        function editItem() {
            inputName.value = name;
            inputName.focus();
            isEditing = true;
            currentIndex = index;
        }
        let span = document.createElement('span');
        span.classList.add('clickable');
        span.textContent = name;
        span.addEventListener('click', editItem)
        return span;
    }

    let divNames = document.querySelector('#names');
    divNames.innerHTML = '';
    
    let ul = document.createElement('ul');
    
    for(var i =0; i < globalNames.length; i++) {
        var currentName = globalNames[i];
        
        let li = document.createElement('li');
        let button = createDeleteButton(i);  
        let span = createSpan(currentName, i);
        li.appendChild(button);
        li.appendChild(span);
        ul.appendChild(li);
    }

    divNames.appendChild(ul)
    clearInput();
}

function clearInput() {
    inputName.value = '';
    inputName.focus()
}
    



