let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];


tarefas.forEach(function(tarefa) {
    criarItem(tarefa);
});

console.log(tarefas);
function adicionar() {
    let input = document.getElementById('tarefa');
    let tarefa = input.value.trim();  
    if (tarefa === '') return; 

    tarefas.push(tarefa); 
    localStorage.setItem('tarefas', JSON.stringify(tarefas)); 

    criarItem(tarefa); 
    input.value = ''; 
}

function criarItem(tarefa) {
    let lista = document.getElementById('lista');
    let item = document.createElement('li');

    let span = document.createElement('span');
    span.innerText = tarefa;

    let buttom = document.createElement('button');
    buttom.innerText = 'x';
    buttom.classList.add('buttom');

    let btnEdt = document.createElement('button');
    btnEdt.innerText = 'Editar';

    item.appendChild(span);
    item.appendChild(buttom);
    item.appendChild(btnEdt);
    lista.appendChild(item);
    

    item.addEventListener('click', function(e) {
        if (e.target !== buttom) {
            item.classList.toggle('concluida');
        }
    });

    btnEdt.addEventListener('click', function(e) {
        e.stopPropagation();
        if (e.target !== buttom) {
            let textoAntigo = span.innerText;
             let editor = prompt('Editar tarefa', textoAntigo);
             if(editor){
                span.innerText = editor
                let editorIndici = tarefas.indexOf(textoAntigo);
                if (editorIndici !== -1){
                    tarefas[editorIndici] = editor;

                }
                localStorage.setItem('tarefas', JSON.stringify(tarefas));
             }
        }
    });

    buttom.addEventListener('click', function(e) {
        e.stopPropagation();
        tarefas = tarefas.filter(t => t !== tarefa);
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
        item.remove();
    });
}

let limpaTudo = document.getElementById('limpar');
limpaTudo.addEventListener('click', function() {
    if (confirm('Tem certeza que deseja apagar todas as tarefas?')) {
        tarefas = [];
        localStorage.removeItem('tarefas');
        let lista = document.getElementById('lista');
        lista.innerHTML = '';
    }
});