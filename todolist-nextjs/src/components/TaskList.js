'use client';
import styles from './TaskList.module.css';

import {useState} from "react";

export default function TaskList({ tasks, onDeleteTask, onUpdateStatus }) {
    const [expandedTaskId, setExpandedTaskId] = useState(null);

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
                                Mudar
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
                                        <li key={subtarefa.id} className={styles.subtaskItem}>
                                            <span>{subtarefa.descricao}</span>
                                            {/* Aqui no futuro podem ter botões para a subtarefa */}
                                        </li>
                                    ))}
                                </ul>

                                {/* Formulário para adicionar nova subtarefa */}
                                {/* (Por enquanto, um placeholder. Depois criaremos um componente para isso) */}
                                <form className={styles.subtaskForm}>
                                    <input type="text" placeholder="Adicionar nova subtarefa..." />
                                    <button type="submit">+</button>
                                </form>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    );
}