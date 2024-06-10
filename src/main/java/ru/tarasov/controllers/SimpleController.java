package ru.tarasov.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("")
public class SimpleController {
    @GetMapping("")
    public String showPage(Model model) {
        return "index";
    }
}
