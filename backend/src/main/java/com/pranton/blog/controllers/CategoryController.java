package com.pranton.blog.controllers;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.pranton.blog.dto.CategoryDto;
import com.pranton.blog.dto.CreateCategoryRequest;
import com.pranton.blog.entity.Category;
import com.pranton.blog.mapper.CategoryMapper;
import com.pranton.blog.services.CategoryService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping(path = "/api/v1/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;
    private final CategoryMapper categoryMapper;
    @GetMapping
    public ResponseEntity<List<CategoryDto>> getCategories() {
        List<Category> list = categoryService.listCategories();
        List<CategoryDto> collect = list.stream().map(category -> categoryMapper.toDto(category)).collect(Collectors.toList());
        return ResponseEntity.status(200).body(collect);
    }

    @PostMapping
    public ResponseEntity<CategoryDto> createCategory(@Valid @RequestBody CreateCategoryRequest createCategoryRequest) {
        Category categoryToCreate = categoryMapper.toEntity(createCategoryRequest);
        // save the category

        Category createdCategory = categoryService.createCategory(categoryToCreate);

        return ResponseEntity.status(201).body(categoryMapper.toDto(createdCategory));
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable UUID id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }
}
