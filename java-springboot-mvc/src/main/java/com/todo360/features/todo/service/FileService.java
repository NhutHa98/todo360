package com.todo360.features.todo.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;

public interface FileService {
    /**
     * Upload a file to the storage system
     * @param file The file to upload
     * @param path The path where the file should be stored
     * @return The URL or path where the file can be accessed
     */
    String uploadFile(MultipartFile file, String path) throws IOException;

    /**
     * Delete a file from the storage system
     * @param path The path of the file to delete
     * @return true if deletion was successful, false otherwise
     */
    boolean deleteFile(String path);

    /**
     * Get the URL or path to access the file
     * @param path The path of the file
     * @return The URL or path where the file can be accessed
     */
    String getFileUrl(String path);
}
