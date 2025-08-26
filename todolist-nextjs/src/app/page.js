    'use client';

    import { useTasks } from '@/hooks/useTasks'; // 1. Importa nossa caixa de ferramentas
    import TaskForm from '../components/TaskForm'; // (Supondo que você já tenha o TaskForm separado)
    import TaskList from '../components/TaskList'; // (E a TaskList também)
    import Link from 'next/link';

    export default function Home() {
        // 2. Pega tudo que precisamos da nossa caixa de ferramentas em uma única linha!
        const { tarefas, criarTarefa, deletarTarefa, atualizarStatus } = useTasks();

        // 3. A página agora só orquestra os componentes visuais
        return (
            <main>
                <header>
                    <Link href="/sobre" className="nav-button">
                        Sobre
                    </Link>
                    <h1>Minha Lista de Tarefas (Next.js)</h1>
                </header>

                {/* O formulário agora só precisa chamar a função criarTarefa do nosso hook */}
                <TaskForm onTaskCreated={criarTarefa} />

                {/* A lista recebe os dados e as funções de deletar/atualizar do nosso hook */}
                <TaskList
                    tasks={tarefas}
                    onDeleteTask={deletarTarefa}
                    onUpdateStatus={atualizarStatus}
                />
            </main>
        );
    }