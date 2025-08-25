'use client';

import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:8080/tarefas';

// Esta é a nossa "caixa de ferramentas" de lógica para tarefas
export function useTasks() {
    const [tarefas, setTarefas] = useState([]);

    async function buscarTarefas() {
        const response = await fetch(API_URL);
        const data = await response.json();
        setTarefas(data);
    }

    // Busca as tarefas na primeira vez que o hook é usado
    useEffect(() => {
        buscarTarefas();
    }, []);

    async function criarTarefa(novaTarefa) {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novaTarefa),
        });
        buscarTarefas(); // Atualiza a lista
    }

    async function deletarTarefa(id) {
        const querDeletar = confirm('Você tem certeza que deseja deletar esta tarefa?');
        if (querDeletar) {
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            buscarTarefas(); // Atualiza a lista
        }
    }

    async function atualizarStatus(id) {
        const tarefaParaAtualizar = tarefas.find(t => t.id === id);

        if (!tarefaParaAtualizar) return;

        const tarefaAtualizada = {
            ...tarefaParaAtualizar,
            concluida: !tarefaParaAtualizar.concluida
        };

        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tarefaAtualizada),
        });
        buscarTarefas(); // Atualiza a lista
    }

    // O hook "exporta" o estado e as funções para quem o usar
    return { tarefas, criarTarefa, deletarTarefa, atualizarStatus };
}