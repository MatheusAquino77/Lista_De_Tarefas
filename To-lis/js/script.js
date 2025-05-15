let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

tarefas.forEach(novaTarefa => {
    criarItem(novaTarefa);
});



let filtro = document.getElementById('filtrar');

filtro.addEventListener('change', function () {
    filtrarTarefas(filtro.value);
});


let filterCate = document.getElementById('filtercate');

filterCate.addEventListener('change', function () {
    filtrarCategoria(filterCate.value);
});


//--------------------------------------------------------------------------------------------------------------------//
// Função para Adicionar a Tarefa//
function adicionar() {
    let input = document.getElementById('tarefa');
    let date = document.getElementById('data');
    let select = document.getElementById('categorias');

    let tarefa = input.value.trim();
    let tarefaData = date.value;
    let categoria = select.value;

    if (tarefa === '' || tarefaData === '' || categoria === '') return;
    
    let novaTarefa = {
        texto: tarefa,
        data: tarefaData,
        categorias: categoria,
        concluida: false
    };
    
    tarefas.push(novaTarefa); 
    localStorage.setItem('tarefas', JSON.stringify(tarefas)); 

    criarItem(novaTarefa); 
    input.value = ''; 
    date.value = '';
    categoria.value = '';
}
//-------------------------------------------------------------------------------------------------------------------//
// Função para Criar a Tarefa//
function criarItem(novaTarefa) {
    let lista = document.getElementById('lista');
    let item = document.createElement('li');

    let span = document.createElement('span');
    span.innerText = novaTarefa.texto;

    let spanData = document.createElement('span');
    let partes = novaTarefa.data.split('-'); // separa em [AAAA, MM, DD]
    let dataFormatada = `${partes[2]}/${partes[1]}/${partes[0]}`;
    spanData.innerText = `Data: ${dataFormatada}`;
    spanData.style.marginLeft = '10px';
    spanData.style.fontSize = '12px';
    spanData.style.color = 'gray';

    let spanCategorio = document.createElement('span');
    spanCategorio.innerHTML = `Categoria: ${novaTarefa.categorias}`;

    let button = document.createElement('button');
    button.innerText = 'x';
    button.classList.add('button');

    let btnEdt = document.createElement('button');
    btnEdt.innerText = 'Editar';

    let btnConcluida = document.createElement('button');
    btnConcluida.innerText = 'Concluido';

    if (novaTarefa.concluida) {
        item.classList.add('concluida');
    }
    
    item.appendChild(span);
    item.appendChild(spanData);
    item.appendChild(spanCategorio);
    item.appendChild(btnConcluida);
    item.appendChild(btnEdt);
    item.appendChild(button);
    lista.appendChild(item);

    btnConcluida.addEventListener('click', function(e) {
       item.classList.toggle('concluida');

    // Atualiza a tarefa no array
        let index = tarefas.findIndex(t => 
            t.texto === novaTarefa.texto && 
            t.data === novaTarefa.data && 
            t.categorias === novaTarefa.categorias
    )   ;

        if (index !== -1) {
            tarefas[index].concluida = item.classList.contains('concluida');
            localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }
        
    });

    btnEdt.addEventListener('click', function(e) {
        e.stopPropagation();
        if (e.target !== button) {
            let textoAntigo = span.innerText;
            let editor = prompt('Editar tarefa', textoAntigo);
             if(editor){
                span.innerText = editor
                let editorIndici = tarefas.findIndex(t => t.texto === textoAntigo);
                if (editorIndici !== -1){
                    tarefas[editorIndici].texto = editor;
                }
                localStorage.setItem('tarefas', JSON.stringify(tarefas));
             }
        }
    });

    button.addEventListener('click', function(e) {
        e.stopPropagation();
        tarefas = tarefas.filter(t => t !== novaTarefa);
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
        item.remove();
    });
}
//-------------------------------------------------------------------------------------------------------------------//
function filtrarTarefas(filtroSelecionado) {
    const itens = document.querySelectorAll('#lista li');

    itens.forEach(item => {
        const estaConcluida = item.classList.contains('concluida');
        

        if (filtroSelecionado === 'todos') {
            item.style.display = 'flex';
        } else if (filtroSelecionado === 'concluido') {
            item.style.display = estaConcluida ? 'flex' : 'none';
        } else if (filtroSelecionado === 'pendente') {
            item.style.display = !estaConcluida ? 'flex' : 'none';
        }
    });
}

function filtrarCategoria(filterSelect){

    let lista = document.getElementById('lista');
    lista.innerHTML = ''; 

    if(filterSelect === 'Todas'){    
        tarefas.forEach(novaTarefa => {
            criarItem(novaTarefa);      
        });
    }else {
        let filtradas = tarefas.filter(tarefa => tarefa.categorias === filterSelect);
        filtradas.forEach(tarefa => criarItem(tarefa));
        
    }
}


//-------------------------------------------------------------------------------------------------------------------//
// Evento com funçõa de Excluir todas tarefas //
let limpaTudo = document.getElementById('limpar');
limpaTudo.addEventListener('click', function() {
    if (confirm('Tem certeza que deseja apagar todas as tarefas?')) {
        tarefas = [];
        localStorage.removeItem('tarefas');
        let lista = document.getElementById('lista');
        lista.innerHTML = '';
    }
});