package com.pranton.blog.services.impls;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.pranton.blog.entity.Category;
import com.pranton.blog.repositories.CategoryRepository;
import com.pranton.blog.services.CategoryService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryServiceImp implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    @Transactional
    public Category createCategory(Category category) {
        // TODO Auto-generated method stub
        if(categoryRepository.existsByNameIgnoreCase(category.getName())) {
            throw new IllegalArgumentException("Category already exists with name" + category.getName());
        }
        return categoryRepository.save(category);
    }

    @Override
    public List<Category> listCategories() {
        // TODO Auto-generated method stub
        return categoryRepository.findAllWithPostCount();
    }

    @Override
    public void deleteCategory(UUID id) {
        Optional<Category> existingCategory = categoryRepository.findById(id);
        if(existingCategory.isPresent()) {
            if(!existingCategory.get().getPosts().isEmpty()) {
                throw new IllegalStateException("Category has posts associated with it");
            }
            categoryRepository.deleteById(id);
        }
    }

    @Override
    public Category getCategoryById(UUID id) {
        // TODO Auto-generated method stub
        return categoryRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Category not found with id " + id));
    }
    
}
