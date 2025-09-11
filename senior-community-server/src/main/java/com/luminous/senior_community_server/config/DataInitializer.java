package com.luminous.senior_community_server.config;

import com.luminous.senior_community_server.bean.User;
import com.luminous.senior_community_server.bean.Manager;
import com.luminous.senior_community_server.service.UserService;
import com.luminous.senior_community_server.service.ManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserService userService;
    
    @Autowired
    private ManagerService managerService;

    @Override
    public void run(String... args) throws Exception {
        // 检查是否已有测试用户，避免重复插入
        try {
            User existingUser = userService.selectByUsername("testuser");
            if (existingUser == null) {
                // 插入测试用户1
                User testUser1 = new User();
                testUser1.setName("测试用户");
                testUser1.setSex("男");
                testUser1.setNo("1001");
                testUser1.setAge(65);
                testUser1.setDescription("测试用户账号");
                testUser1.setPhoneNumber("13800138000");
                testUser1.setUsername("testuser");
                testUser1.setPassword("123456");
                testUser1.setRole("user");
                userService.add(testUser1);
                
                // 插入测试用户2
                User testUser2 = new User();
                testUser2.setName("张三");
                testUser2.setSex("女");
                testUser2.setNo("1002");
                testUser2.setAge(70);
                testUser2.setDescription("社区居民");
                testUser2.setPhoneNumber("13900139000");
                testUser2.setUsername("zhangsan");
                testUser2.setPassword("password");
                testUser2.setRole("user");
                userService.add(testUser2);
                
                System.out.println("测试用户数据初始化完成");
            } else {
                System.out.println("测试用户已存在，跳过初始化");
            }
            
            // 初始化管理员数据
            Manager existingManager = managerService.findByUsername("admin");
            if (existingManager == null) {
                Manager testManager = new Manager();
                testManager.setUsername("admin");
                testManager.setPassword("admin123");
                managerService.addManager(testManager);
                System.out.println("测试管理员数据初始化完成");
            } else {
                System.out.println("测试管理员已存在，跳过初始化");
            }
        } catch (Exception e) {
            System.out.println("数据初始化过程中出现错误: " + e.getMessage());
        }
    }
}