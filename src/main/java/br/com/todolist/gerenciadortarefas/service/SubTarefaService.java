package br.com.todolist.gerenciadortarefas.service;

import br.com.todolist.gerenciadortarefas.entity.SubTarefa;
import br.com.todolist.gerenciadortarefas.repository.SubTarefaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SubTarefaService {

    @Autowired
    private SubTarefaRepository subTarefaRepository;

    public SubTarefa criarSubTarefa(SubTarefa subTarefa) {
        return subTarefaRepository.save(subTarefa);
    }

    public List<SubTarefa> listarTodas() {
        return subTarefaRepository.findAllByOrderByIdDesc();
    }

    public Optional<SubTarefa> buscarPorId(Long id) {
        return subTarefaRepository.findById(id);
    }

    public SubTarefa atualizarSubTarefa(SubTarefa subTarefa) {
        return subTarefaRepository.save(subTarefa);
    }

    public void deletarSubTarefa(Long id) {
        subTarefaRepository.deleteById(id);
    }

    public List<SubTarefa> listarSubTarefasDeUmaTarefa(Long tarefaId) {
        return subTarefaRepository.findByTarefaId(tarefaId);
    }
}