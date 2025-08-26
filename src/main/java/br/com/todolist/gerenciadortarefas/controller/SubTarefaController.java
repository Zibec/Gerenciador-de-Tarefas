package br.com.todolist.gerenciadortarefas.controller;

import br.com.todolist.gerenciadortarefas.entity.SubTarefa;
import br.com.todolist.gerenciadortarefas.service.SubTarefaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/subtarefas")
@CrossOrigin(origins = "*")
public class SubTarefaController {

    @Autowired
    private SubTarefaService subTarefaService; // Agora depende do Service!

    //Subtarefas não precisa de um metodo post

    @GetMapping
    public List<SubTarefa> listarSub() {
        return subTarefaService.listarTodas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SubTarefa> buscarSubPorId(@PathVariable Long id) {
        return subTarefaService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SubTarefa> atualizarSub(@PathVariable Long id, @RequestBody SubTarefa subTarefaAtualizada) {
        return subTarefaService.buscarPorId(id)
                .map(tarefaExistente -> {
                    tarefaExistente.setDescricao(subTarefaAtualizada.getDescricao());
                    tarefaExistente.setConcluida(subTarefaAtualizada.isConcluida());
                    return ResponseEntity.ok(subTarefaService.atualizarSubTarefa(subTarefaAtualizada));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarSub(@PathVariable Long id) {
        subTarefaService.deletarSubTarefa(id);
        return ResponseEntity.noContent().build();
    }
}