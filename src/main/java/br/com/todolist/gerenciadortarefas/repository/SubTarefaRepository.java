package br.com.todolist.gerenciadortarefas.repository;

import br.com.todolist.gerenciadortarefas.entity.SubTarefa;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubTarefaRepository extends JpaRepository<SubTarefa, Long> {
        List<SubTarefa> findAllByOrderByIdDesc();
}