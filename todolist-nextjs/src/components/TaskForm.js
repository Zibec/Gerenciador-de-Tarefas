'use client';

import { useState } from 'react';
import styles from './TaskForm.module.css';

// Este componente agora tem suas próprias "memórias" (estados) para os campos do formulário
export default function TaskForm({ onTaskCreated }) {
    const [descricao, setDescricao] = useState('');
    const [prioridade, setPrioridade] = useState('');
    const [concluida, setConcluida] = useState('');

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
        setPrioridade('');
        setConcluida('');

        // Avisa a página principal que uma nova tarefa foi criada
        onTaskCreated();
    }

    return (
        <section className="input-section">
            {/* 2. Usa as classes do módulo com a sintaxe styles.NOME_DA_CLASSE */}
            <form className={styles.form} onSubmit={handleCriarTarefa}>
                <input
                    className={styles.input}
                    type="text"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    placeholder="Digite uma nova tarefa..."
                    required
                />
                <select
                    className={styles.select}
                    value={prioridade}
                    onChange={(e) => setPrioridade(e.target.value)}
                    required
                >
                    <option value="" disabled>Selecione a Prioridade</option>
                    <option value="ALTA">Alta</option>
                    <option value="MEDIA">Média</option>
                    <option value="BAIXA">Baixa</option>
                </select>
                <select
                    className={styles.select}
                    value={concluida}
                    onChange={(e) => setConcluida(e.target.value === 'true')}
                    // parte complicadinha, se for true === true, true, se for false === true, false
                    required
                >
                    <option value="" disabled>Já foi concluída ?</option>
                    <option value="false">Não</option>
                    <option value="true">Sim</option>
                </select>
                <button className={styles.button} type="submit">Adicionar</button>
            </form>
        </section>
    );
}