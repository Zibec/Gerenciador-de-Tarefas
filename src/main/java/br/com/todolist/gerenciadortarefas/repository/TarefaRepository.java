package br.com.todolist.gerenciadortarefas.repository;

import br.com.todolist.gerenciadortarefas.entity.Tarefa;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
public interface TarefaRepository extends JpaRepository<Tarefa, Long> {
        List<Tarefa> findAllByOrderByIdDesc();
}