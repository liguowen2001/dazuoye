package club.yunzhi.log.service;


import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileService {

    String save(MultipartFile file) throws IOException;

    String update(MultipartFile file, String fileName) throws IOException;

    void delete(String fileName);

}
