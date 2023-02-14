package com.todo.mapper;

import com.todo.dto.TodoDTO;
import com.todo.model.Todo;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class TodoMapper {

    public List<TodoDTO> toTodoDTOs(List<Todo> todos) {
        return todos.stream().map(this::toTodoDTO).collect(Collectors.toList());
    }

    public TodoDTO toTodoDTO(Todo todo) {
        return new TodoDTO(todo.getId(), todo.getTask(), todo.getPriority());
    }
}
