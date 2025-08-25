'use client';

// Este componente recebe 3 "props":
// 1. tasks: O array com as tarefas a serem exibidas.
// 2. onDeleteTask: A função para chamar quando um botão de deletar for clicado.
// 3. onUpdateStatus: A função para chamar quando o status de uma tarefa for alterado.
export default function TaskList({ tasks, onDeleteTask, onUpdateStatus }) {
    return (
        <section className="task-list-section">
            <h2>Tarefas</h2>
            <ul id="task-list">
                {tasks.map(tarefa => (
                    <li key={tarefa.id} className={tarefa.concluida ? 'concluida' : ''}>

            <span className="task-text">
              {`${tarefa.descricao} - [Prioridade: ${tarefa.prioridade}]`}
            </span>
                        <div className="task-actions">
                            <button className="change-btn" onClick={() => onUpdateStatus(tarefa.id)}>
                                Mudar
                            </button>
                            <button className="delete-btn" onClick={() => onDeleteTask(tarefa.id)}>
                                Deletar
                            </button>
                        </div>

                    </li>
                ))}
            </ul>
        </section>
    );
}