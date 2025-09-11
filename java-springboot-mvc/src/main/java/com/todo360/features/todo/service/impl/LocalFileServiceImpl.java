package com.todo360.features.todo.service.impl;

import com.todo360.features.todo.service.FileService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class LocalFileServiceImpl implements FileService {

    @Value("${file.upload.directory}")
    private String uploadDirectory;

    @Override
    public String uploadFile(MultipartFile file, String path) throws IOException {
        Path uploadPath = Paths.get(uploadDirectory, path);
        Files.createDirectories(uploadPath.getParent());
        Files.copy(file.getInputStream(), uploadPath);
        return uploadPath.toString();
    }

    @Override
    public boolean deleteFile(String path) {
        try {
            Path filePath = Paths.get(path);
            return Files.deleteIfExists(filePath);
        } catch (IOException e) {
            return false;
        }
    }

    @Override
    public String getFileUrl(String path) {
        return path;
    }
}
