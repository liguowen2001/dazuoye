package club.yunzhi.log.service;

import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.UUID;

@Service
public class FileServiceImpl implements FileService {

    String rootPath = "/home/liguowen/文档/images/";

    //String rootPath = "C:/project/firstWeb/files/";

    //String rootPath = "/home/ubuntu/teaching-plan/files/";
    @Override
    public String save(MultipartFile file){
        String newFileName = UUID.randomUUID().toString()+file.getOriginalFilename();

        try {
            File newFile = new File(rootPath+newFileName);
            //定义向数据库中存取的文件路径
            if(!newFile.getParentFile().exists()){
                newFile.getParentFile().mkdirs();
            }else{
                System.out.println(newFile.getParentFile());
            }
            file.transferTo(newFile);
            // return file.getOriginalFilename();
        } catch (Exception e){
            e.printStackTrace();
        }
        return newFileName;
    }

    @Override
    public String update(MultipartFile file, String fileName) throws IOException {
        String newFileName = fileName;
        File newFile = new File(rootPath+newFileName);
        System.out.println(rootPath+newFileName);
        //定义向数据库中存取的文件路径
        if(!newFile.getParentFile().exists()){
            newFile.getParentFile().mkdirs();
        }else{
            System.out.println(newFile.getParentFile());
        }
        file.transferTo(newFile);
        return newFileName;
    }

    @Override
    public void delete(String fileName) {
        String pace = rootPath+ fileName;
        File file = new File(pace);
        file.delete();
    }


}
