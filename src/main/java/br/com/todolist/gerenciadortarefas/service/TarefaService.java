package br.com.todolist.gerenciadortarefas.service;

import br.com.todolist.gerenciadortarefas.entity.SubTarefa;
import br.com.todolist.gerenciadortarefas.entity.Tarefa;
import br.com.todolist.gerenciadortarefas.repository.SubTarefaRepository;
import br.com.todolist.gerenciadortarefas.repository.TarefaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TarefaService {

    @Autowired
    private TarefaRepository tarefaRepository;
    @Autowired
    private SubTarefaRepository subTarefaRepository;

    public Tarefa criarTarefa(Tarefa tarefa) {
        return tarefaRepository.save(tarefa);
    }

    public List<Tarefa> listarTodas() {
        return tarefaRepository.findAllByOrderByIdDesc();
    }

    public Optional<Tarefa> buscarPorId(Long id) {
        return tarefaRepository.findById(id);
    }

    public Tarefa atualizarTarefa(Tarefa tarefa) {
        return tarefaRepository.save(tarefa);
    }

    public void deletarTarefa(Long id) {
        tarefaRepository.deleteById(id);
    }

    public SubTarefa adicionarSubTarefa(Long tarefaId,SubTarefa novaSubTarefa) {
        Tarefa tarefaMae = tarefaRepository.findById(tarefaId).orElseThrow(() -> new RuntimeException("Tarefa não encontrada!"));

        //Linka com a tarefa principal
        novaSubTarefa.setTarefa(tarefaMae);

        return subTarefaRepository.save(novaSubTarefa);
    }

}