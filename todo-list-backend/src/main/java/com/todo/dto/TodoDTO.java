
package com.todo.dto;

import java.util.Objects;

public class TodoDTO {

    private Integer id;
    private String task;
    private Integer priority;

    public TodoDTO(Integer id, String task, Integer priority) {
        this.id = id;
        this.task = task;
        this.priority = priority;
    }

    public String getTask() {
        return task;
    }

    public void setTask(String task) {
        this.task = task;
    }

    public Integer getPriority() {
        return priority;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TodoDTO todo = (TodoDTO) o;
        return id.equals(todo.id) && Objects.equals(task, todo.task) && Objects.equals(priority, todo.priority);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, task, priority);
    }
}
