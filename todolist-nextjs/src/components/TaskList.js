'use client';
import styles from './TaskList.module.css';

import {useState} from "react";

// Este componente recebe 3 "props":
// 1. tasks: O array com as tarefas a serem exibidas.
// 2. onDeleteTask: A função para chamar quando um botão de deletar for clicado.
// 3. onUpdateStatus: A função para chamar quando o status de uma tarefa for alterado.
export default function TaskList({ tasks, onDeleteTask, onUpdateStatus }) {
    const [expandedTaskId, setExpandedTaskId] = useState(null);

    return (
        <section className="task-list-section">
            <h2>Tarefas</h2>
            {/* 2. Usa as classes do módulo */}
            <ul className={styles.taskList}>
                {tasks.map(tarefa => (
                    // Combina a classe base com a classe condicional
                    <li
                        key={tarefa.id}
                        className={`${styles.taskItem} 
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
                    </li>
                ))}
            </ul>
        </section>
    );
}