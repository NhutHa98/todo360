package com.todo360.features.todo.web;

import com.todo360.features.todo.model.Todo;
import com.todo360.features.todo.service.TodoService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@Controller
@RequestMapping("/todos")
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping
    public String list(Model model) {
        model.addAttribute("todos", todoService.findAll());
        return "todo/list";
    }

    @GetMapping("/new")
    public String createForm(Model model) {
        model.addAttribute("todo", new Todo());
        return "todo/form";
    }

    @PostMapping
    public String save(@ModelAttribute("todo") @Valid Todo todo, BindingResult br) {
        if (br.hasErrors()) return "todo/form";
        todoService.save(todo);
        return "redirect:/todos";
    }

    @GetMapping("/edit/{id}")
    public String edit(@PathVariable Long id, Model model) {
        todoService.findById(id).ifPresent(t -> model.addAttribute("todo", t));
        return "todo/form";
    }

    @PostMapping("/delete/{id}")
    public String delete(@PathVariable Long id) {
        todoService.deleteById(id);
        return "redirect:/todos";
    }
}

