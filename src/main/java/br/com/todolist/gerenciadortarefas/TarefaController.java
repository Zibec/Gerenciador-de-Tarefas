package br.com.todolist.gerenciadortarefas;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@CrossOrigin(origins = "*") // Permite que qualquer origem acesse a API
@RestController
@RequestMapping("/tarefas")
public class TarefaController {

    @Autowired
    private TarefaRepository tarefaRepository;

    @PostMapping
    public Tarefa criar(@RequestBody Tarefa tarefa) {
        return this.tarefaRepository.save(tarefa);
    }

    @GetMapping
    public List<Tarefa> listar() {
        return this.tarefaRepository.findAll();
    }

    @GetMapping("/{id}")
    public Tarefa buscarPorId(@PathVariable Long id) {
        return this.tarefaRepository.findById(id)
                .orElse(null); // Se encontrar a tarefa, a retorna. Se não, retorna null.
    }

    // Dentro da classe TarefaController

    @PutMapping("/{id}")
    public ResponseEntity<Tarefa> atualizar(@PathVariable Long id, @RequestBody Tarefa tarefaAtualizada) {
        return this.tarefaRepository.findById(id)
                .map(tarefaExistente -> {
                    tarefaExistente.setDescricao(tarefaAtualizada.getDescricao());
                    tarefaExistente.setPrioridade(tarefaAtualizada.getPrioridade());
                    tarefaExistente.setConcluida(tarefaAtualizada.isConcluida());

                    Tarefa tarefaSalva = this.tarefaRepository.save(tarefaExistente);

                    return ResponseEntity.ok(tarefaSalva);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        this.tarefaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}