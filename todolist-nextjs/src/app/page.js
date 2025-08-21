'use client';

import { useState, useEffect } from 'react';

// Não precisamos mais do import de styles.module.css

export default function Home() {
    const [tarefas, setTarefas] = useState([]);
    const [novaTarefaDescricao, setNovaTarefaDescricao] = useState('');
    const [novaTarefaPrioridade, setNovaTarefaPrioridade] = useState('MEDIA'); // Valor inicial
    const [novaTarefaConcluida, setNovaTarefaConcluida] = useState(false); // Valor inicial

    const API_URL = 'http://localhost:8080/tarefas';

    async function buscarTarefas() {
        const response = await fetch(API_URL);
        const data = await response.json();
        data.reverse();
        setTarefas(data);
    }

    useEffect(() => {
        buscarTarefas();
    }, []);

    async function handleCriarTarefa(event) {
        event.preventDefault();
        if (!novaTarefaDescricao.trim()) {
            alert('A descrição não pode ser vazia.');
            return;
        }

        const novaTarefa = {
            descricao: novaTarefaDescricao.trim(),
            prioridade: novaTarefaPrioridade,
            concluida: novaTarefaConcluida,
        };

        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novaTarefa),
        });

        // Limpa os campos e busca as tarefas novamente
        setNovaTarefaDescricao('');
        setNovaTarefaPrioridade('MEDIA');
        setNovaTarefaConcluida(false);
        buscarTarefas();
    }

    // JSX com os IDs e Classes que o seu CSS espera
    return (
        <main>
            <header>
                <h1>Minha Lista de Tarefas (Next.js)</h1>
            </header>

            <section className="input-section">
                <form id="new-task-form" onSubmit={handleCriarTarefa}>
                    <input
                        id="task-input" // Usando ID
                        type="text"
                        value={novaTarefaDescricao}
                        onChange={(e) => setNovaTarefaDescricao(e.target.value)}
                        placeholder="Digite uma nova tarefa..."
                        required
                    />
                    <select
                        id="priority-input" // Usando ID
                        className="form-select" // Usando Classe
                        value={novaTarefaPrioridade}
                        onChange={(e) => setNovaTarefaPrioridade(e.target.value)}
                    >
                        <option value="ALTA">Alta</option>
                        <option value="MEDIA">Média</option>
                        <option value="BAIXA">Baixa</option>
                    </select>
                    {/* Adicionando o campo de concluído que faltava na versão React */}
                    <select
                        id="conclusion-input" // Usando ID
                        className="form-select" // Usando Classe
                        value={novaTarefaConcluida}
                        onChange={(e) => setNovaTarefaConcluida(e.target.value === 'true')}
                    >
                        <option value="false">Não</option>
                        <option value="true">Sim</option>
                    </select>

                    <button id="button-submit" type="submit">Adicionar</button>
                </form>
            </section>

            <section className="task-list-section">
                <h2>Tarefas</h2>
                <ul id="task-list">

                    {
                        tarefas.map(tarefa => {
                            return (
                                <li key={tarefa.id} className={tarefa.concluida ? 'concluida' : ''}>
                                    {tarefa.descricao} - [Prioridade: {tarefa.prioridade}] - [Concluída: {tarefa.concluida ? "Sim" : "Não"}]
                                </li>
                            );
                        })
                    }
                </ul>

            </section>
        </main>
    );
}