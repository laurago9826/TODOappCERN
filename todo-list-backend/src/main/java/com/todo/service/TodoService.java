package com.todo.service;

import com.todo.dto.TodoDTO;
import com.todo.mapper.TodoMapper;
import com.todo.model.Todo;
import com.todo.repository.TodoRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TodoService {

    private final TodoRepository todoRepository;
    private final TodoMapper todoMapper;

    public TodoService(TodoRepository todoRepository, TodoMapper todoMapper) {
        this.todoRepository = todoRepository;
        this.todoMapper = todoMapper;
    }
    public List<TodoDTO> getAll() {
        return todoMapper.toTodoDTOs(todoRepository.findAll());
    }

    public void delete(Integer id) {
        todoRepository.deleteById(id);
    }
}
