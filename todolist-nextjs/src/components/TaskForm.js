'use client';

import { useState } from 'react';

// Este componente agora tem suas próprias "memórias" (estados) para os campos do formulário
export default function TaskForm({ onTaskCreated }) {
    const [descricao, setDescricao] = useState('');
    const [prioridade, setPrioridade] = useState('MEDIA');
    const [concluida, setConcluida] = useState(false);

    const API_URL = 'http://localhost:8080/tarefas';

    async function handleCriarTarefa(event) {
        event.preventDefault();
        if (!descricao.trim()) {
            alert('A descrição não pode ser vazia.');
            return;
        }

        const novaTarefa = {
            descricao: descricao.trim(),
            prioridade: prioridade,
            concluida: concluida,
        };

        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novaTarefa),
        });

        // Limpa os campos do formulário
        setDescricao('');
        setPrioridade('MEDIA');
        setConcluida(false);

        // Avisa a página principal que uma nova tarefa foi criada
        onTaskCreated();
    }

    return (
        <section className="input-section">
            <form id="new-task-form" onSubmit={handleCriarTarefa}>
                <input
                    id="task-input"
                    type="text"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    placeholder="Digite uma nova tarefa..."
                    required
                />
                <select
                    id="priority-input"
                    className="form-select"
                    value={prioridade}
                    onChange={(e) => setPrioridade(e.target.value)}
                    required
                >
                    <option value="ALTA">Alta</option>
                    <option value="MEDIA">Média</option>
                    <option value="BAIXA">Baixa</option>
                </select>
                <select
                    id="conclusion-input"
                    className="form-select"
                    value={concluida}
                    onChange={(e) => setConcluida(e.target.value === 'true')}
                    required
                >
                    <option value="false">Não</option>
                    <option value="true">Sim</option>
                </select>
                <button id="button-submit" type="submit">Adicionar</button>
            </form>
        </section>
    );
}