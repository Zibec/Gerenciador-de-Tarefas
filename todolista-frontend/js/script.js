// URL da nossa API Spring Boot (verifique se a porta está correta)
const API_URL = 'http://localhost:8080/tarefas';

// Pegando os elementos do HTML com os quais vamos interagir
const taskForm = document.getElementById('new-task-form');
const taskInput = document.getElementById('task-input');
const priorityInput = document.getElementById('priority-input')
const endedInput = document.getElementById('conclusion-input')
const taskList = document.getElementById('task-list');

// Função para buscar as tarefas da API e mostrar na tela
async function buscarTarefas() {
    // Zera a lista de tarefas
    taskList.innerHTML = '';

    // Faz a requisição GET para a nossa API
    const response = await fetch(API_URL);
    const tarefas = await response.json();
    let concluida;

    tarefas.reverse();

    // Para cada tarefa recebida, cria um item na lista (<li>)
    tarefas.forEach(tarefa => {
        const li = document.createElement('li');

        // Adiciona a classe 'concluida' se a tarefa estiver concluída
        if (tarefa.concluida) {
            li.classList.add('concluida');
        }

        concluida = tarefa.concluida ? 'Sim' : 'Não';
        li.textContent = `${tarefa.descricao} - [Prioridade: ${tarefa.prioridade}] - [Concluído? ${concluida}]`

        // Adiciona o novo item <li> dentro da nossa <ul>
        taskList.appendChild(li);
    });
}

// Função para criar uma nova tarefa
async function criarTarefa(event) {
    // Previne o comportamento padrão do formulário, que é recarregar a página
    event.preventDefault();

    const descricao = taskInput.value.trim();
    const prioridade = priorityInput.value;
    const concluida1 = endedInput.value;

    // Se o campo estiver vazio, não faz nada
    if (!descricao) {
        alert("Sua tarefa não pode estar vazia ou conter apenas espaços.")
        return;
    }

    // Monta o objeto da nova tarefa, exatamente como a API espera
    const novaTarefa = {
        descricao: descricao,
        prioridade: prioridade,
        concluida: concluida1
    };

    // Envia a nova tarefa para a API usando o método POST
    await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(novaTarefa), // Converte o objeto JS para uma string JSON
    });

    // Limpa o campo de texto
    taskInput.value = '';
    priorityInput.value = '';
    endedInput.value = '';

    // Busca a lista de tarefas novamente para mostrar a nova tarefa
    buscarTarefas();
}

// "Escutador de Eventos": Diz ao formulário para chamar a função criarTarefa quando for enviado
taskForm.addEventListener('submit', criarTarefa);

// Chama a função para buscar as tarefas assim que a página carrega pela primeira vez
buscarTarefas();