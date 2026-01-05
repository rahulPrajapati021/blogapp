package com.pranton.blog.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pranton.blog.dto.CreatePostRequest;
import com.pranton.blog.dto.CreatePostRequestDto;
import com.pranton.blog.dto.PostsDto;
import com.pranton.blog.dto.UpdatePostRequest;
import com.pranton.blog.dto.UpdatePostRequestDto;
import com.pranton.blog.entity.Post;
import com.pranton.blog.entity.User;
import com.pranton.blog.enums.PostStatus;
import com.pranton.blog.mapper.PostMapper;
import com.pranton.blog.services.PostService;
import com.pranton.blog.services.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(path = "/api/v1/posts")
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;
    private final PostMapper postMapper;
    private final UserService userService;


    @GetMapping
    public ResponseEntity<List<PostsDto>> getPosts(@RequestParam(required = false) UUID categoryId, @RequestParam(required = false) UUID tagId) {
        List<Post> posts = postService.getPosts(categoryId, tagId);
        List<PostsDto> list = posts.stream().map(postMapper::toPostDto).toList();
        return ResponseEntity.ok(list);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<PostsDto> getPost(@PathVariable UUID id) {
        Post post = postService.getPost(id);
        PostsDto postDto = postMapper.toPostDto(post);
        return ResponseEntity.ok(postDto);
    }

    @GetMapping(path = "/drafts") 
    public ResponseEntity<List<PostsDto>> getDraftPosts(@RequestAttribute UUID userId) {
        User loggedInUser = userService.getUserById(userId);
        List<Post> draftPostByAuthor = postService.getPostByAuthor(loggedInUser, PostStatus.DRAFT);
        List<PostsDto> list = draftPostByAuthor.stream().map(postMapper::toPostDto).toList();
        return ResponseEntity.ok(list);
    }

    @PostMapping
    public ResponseEntity<PostsDto> createPost(@Valid @RequestBody CreatePostRequestDto createPostRequestDto, @RequestAttribute UUID userId) {
        User loggedInUser = userService.getUserById(userId);
        CreatePostRequest createPostRequest = postMapper.toCreatePostRequest(createPostRequestDto);
        Post post = postService.createPost(loggedInUser, createPostRequest);
        PostsDto postDto = postMapper.toPostDto(post);
        return ResponseEntity.status(201).body(postDto);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<PostsDto> updatePost(@PathVariable UUID id, @Valid @RequestBody UpdatePostRequestDto updatePostRequestDto) {
        UpdatePostRequest updatePostRequest = postMapper.toUpdatePostRequest(updatePostRequestDto);
        Post updatedPost = postService.updatePost(id, updatePostRequest);
        PostsDto postDto = postMapper.toPostDto(updatedPost);
        return ResponseEntity.ok(postDto);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable UUID id) {
        postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }
}
