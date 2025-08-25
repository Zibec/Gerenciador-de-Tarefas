'use client';
import styles from './TaskList.module.css';

// Este componente recebe 3 "props":
// 1. tasks: O array com as tarefas a serem exibidas.
// 2. onDeleteTask: A função para chamar quando um botão de deletar for clicado.
// 3. onUpdateStatus: A função para chamar quando o status de uma tarefa for alterado.
export default function TaskList({ tasks, onDeleteTask, onUpdateStatus }) {
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