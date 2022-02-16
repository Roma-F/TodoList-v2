let lists = document.querySelector('.todo-list');
let todo;

function toLocal(){
    todo = lists.innerHTML;
    localStorage.setItem('note', todo);
}

if(localStorage.getItem("note")){
    lists.innerHTML = localStorage.getItem('note');
}

function todoItem(name) {
    const fragment = document.createElement('fragmet');
    fragment.innerHTML =
        `
                <label class="todo-item">
                    <input class="todo-item__check" type="checkbox" />
                    <span class="todo-item__name">
                        ${name}
                    </span>
                    <button class="todo-item__remove">
                        x
                    </button>
                </label>
            `;
    return fragment;

}

// view
function render() {
    const count = document.querySelector('.todo-footer__count');
    const list = document.querySelector('.todo-list');

    count.innerText = list.children.length;

    const filter = document.querySelector('[type="radio"]:checked');

    let items = Array.from(document.querySelectorAll('.todo-item'));

  
    if (items.length === 0) return;

    items.forEach(el => {
        el.classList.remove('todo-item--hidden');
    });

    switch (filter.value) {
        case 'complite': {
            let items = Array.from(document.querySelectorAll('.todo-item__check:not(:checked)'));
            items.forEach(el => {
                el.closest('.todo-item').classList.add('todo-item--hidden');
            });
            break;
        }
        case 'active': {
            let items = Array.from(document.querySelectorAll('.todo-item__check:checked'));
            items.forEach(el => {
                el.closest('.todo-item').classList.add('todo-item--hidden');
            });
            break;
        }
    }

}

// controller

function add(str) {
    const list = document.querySelector('.todo-list');
    list.appendChild(todoItem(str));

    render();
    toLocal();
}

function remove(element) {
    element.remove();

    render();
    toLocal();
}

// \\controller

const list = document.querySelector('.todo-list');
list.addEventListener('click', (e) => {
    if (e.target.matches('.todo-item__remove')) {
        remove(e.target.closest('fragmet'));
    }

    render();
});

const filterActions = document.querySelector('.todo-footer__actions');
filterActions.addEventListener('click', (e) => {
    render();
});

const form = document.querySelector('.todo-form');
form.addEventListener('submit', (e) => {
    const tagForm = e.target;
    const tagInput = tagForm.checkName;

    add(tagInput.value);
    tagInput.value = '';

    e.preventDefault();
});

render();

// let button = document.querySelector('#buttonAdd');
// let list = document.querySelector('#newTask');
// let todo;
//
// function toLocal(){
//     todo = list.innerHTML;
//     localStorage.setItem('note', todo);
// }
//
// if(localStorage.getItem("note")){
//     list.innerHTML = localStorage.getItem('note');
// }
//
//
// button.addEventListener('click', ()=> {
//     let li = document.createElement('li');
//     let inputTask = document.querySelector('#inputTasks').value;
//     let t = document.createTextNode(inputTask);
//
//     li.appendChild(t);
//     if(inputTask == ''){
//         alert('add task')
//     }else{
//         list.appendChild(li);
//     }
//
//     document.getElementById('inputTasks').value = '';
//     let span = document.createElement('span');
//     let x = document.createTextNode('X');
//     span.className = 'close';
//     span.appendChild(x);
//     li.appendChild(span);
//
//     toLocal();
// })
//
// //delete tsk
//
// list.addEventListener('click', event => {
//     if(event.target.tagName == 'LI'){
//         event.target.classList.toggle('checked');
//         toLocal();
//     }else if(event.target.tagName == 'SPAN'){
//         let div = event.target.parentNode;
//         div.remove();
//         toLocal();
//     }
// })

