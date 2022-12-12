package club.yunzhi.log.controller;

import club.yunzhi.log.service.FileService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * 文件
 */
@RestController
@RequestMapping("file")
public class FileController {
    @Autowired
    FileService fileService;

    @PostMapping("file")
    public String saveFile(@RequestParam("file") MultipartFile file) throws IOException {
        System.out.println(file.getName());
        return this.fileService.save(file);
    }

    @PostMapping("updateFile")
    public String updateFile(@RequestParam("file") MultipartFile file,@RequestParam("fileName") String fileName ) throws IOException {
        return this.fileService.update(file,fileName);
    }

    @PostMapping ("delete")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteFile(@RequestParam("fileName") String fileName) {
        this.fileService.delete(fileName);
    }

}
