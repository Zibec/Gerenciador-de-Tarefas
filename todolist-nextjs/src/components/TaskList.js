'use client';
import styles from './TaskList.module.css';

import {useState} from "react";

export default function TaskList({ tasks, onDeleteTask, onUpdateStatus, onSubtaskCreated, onDeleteSubtask, onUpdateStatusSubtask}) {
    const [expandedTaskId, setExpandedTaskId] = useState(null);
    const [subtaskText, setSubtaskText] = useState('');

    async function handleSubtaskSubmit(event, tarefaId){
        event.preventDefault();

        if(!subtaskText){
            alert("A descrição da subtaarefa não pode ser vazia.")
            return;
        }

        const novaSubtarefa = {
            descricao: subtaskText.trim(),
            concluida: false
        }

        await fetch(`http://localhost:8080/tarefas/${tarefaId}/subtarefas`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novaSubtarefa)
        })

        setSubtaskText('');

        onSubtaskCreated();
    }

    return (
        <section className="task-list-section">
            <h2>Tarefas</h2>
            <ul className={styles.taskList}>
                {tasks.map(tarefa => (
                    <li
                        key={tarefa.id}
                        className={`${styles.taskItem} 
                        ${expandedTaskId === tarefa.id ? styles.expandedItem : ''}
                        ${tarefa.concluida ? styles.concluida : ''} 
                        ${styles['prioridade' + tarefa.prioridade.charAt(0) + 
                        tarefa.prioridade.slice(1).toLowerCase()]}`}
                    >

                        <button
                            className={`${styles.expandBtn} ${expandedTaskId === tarefa.id ? styles.expanded : ''}`}
                            onClick={() => setExpandedTaskId(expandedTaskId === tarefa.id ? null : tarefa.id)}
                        >
                            {/* Este é o código SVG que desenha a seta */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </button>

                        <span className={styles.taskText}>
                            {`${tarefa.descricao} - [Prioridade: ${tarefa.prioridade}]`}
                        </span>

                        <div className={styles.taskActions}>

                            <button className={styles.changeBtn} onClick={() => onUpdateStatus(tarefa.id)}>
                                Concluir
                            </button>
                            <button className={styles.deleteBtn} onClick={() => onDeleteTask(tarefa.id)}>
                                Deletar
                            </button>
                        </div>

                        {expandedTaskId === tarefa.id && (
                            <div className={styles.taskDetails}>
                                <h4>Subtarefas:</h4>

                                {/* Lista de subtarefas existentes */}
                                <ul className={styles.subtaskList}>
                                    {tarefa.subtarefas.map(subtarefa => (
                                        <li key={subtarefa.id} className={`${styles.subtaskItem} ${subtarefa.concluida ? styles.concluida : ''}`}>

                                            <div className={styles.taskActions}>
                                                <span className={styles.taskText}>{subtarefa.descricao}</span>

                                                <input
                                                    type="checkbox"
                                                    checked={subtarefa.concluida} // Controla se a caixa está marcada
                                                    className={styles.subtaskCheckbox}
                                                    onChange={() => onUpdateStatusSubtask(subtarefa.id)} // Chama a função ao clicar
                                                />
                                                {/* Botão com Ícone de Lixeira */}
                                                <button
                                                    className={styles.iconBtn}
                                                    onClick={() => onDeleteSubtask(subtarefa.id)}
                                                    title="Deletar subtarefa"
                                                >
                                                    {/* Este é o código SVG que desenha a lixeira */}
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                {/* Formulário para adicionar nova subtarefa */}
                                {/* (Por enquanto, um placeholder. Depois criaremos um componente para isso) */}
                                <form
                                    className={styles.subtaskForm}
                                    onSubmit={(e) => handleSubtaskSubmit(e, tarefa.id)}
                                >
                                    <input
                                        type="text"
                                        className={styles.subtaskInput}
                                        value={subtaskText}
                                        onChange={(e) => setSubtaskText(e.target.value)}
                                        placeholder="Adicionar nova subtarefa..." />
                                    <button className={styles.changeBtn} type="submit">Adicionar</button>
                                </form>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    );
}