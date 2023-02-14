package com.todo.rest;

import com.todo.dto.TodoDTO;
import com.todo.service.TodoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("todo")
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping("all")
    public List<TodoDTO> getAll() {
        return todoService.getAll();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Integer id) {
        todoService.delete(id);
    }
}
