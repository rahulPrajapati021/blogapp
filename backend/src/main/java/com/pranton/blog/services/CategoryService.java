package com.pranton.blog.services;

import java.util.List;
import java.util.UUID;

import com.pranton.blog.entity.Category;

public interface CategoryService {
    List<Category> listCategories();
    Category createCategory(Category category);
    void deleteCategory(UUID id);
    Category getCategoryById(UUID id);
}

