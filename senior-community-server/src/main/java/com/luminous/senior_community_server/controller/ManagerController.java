package com.luminous.senior_community_server.controller;

import com.luminous.senior_community_server.bean.Manager;
import com.luminous.senior_community_server.common.Result;
import com.luminous.senior_community_server.service.ManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/manager")
public class ManagerController {

    @Autowired
    private ManagerService managerService;

    /**
     * 管理员登录接口
     * @param loginData 包含用户名和密码的登录数据
     * @return 登录结果，包含token和用户信息
     */
    @PostMapping("/login")
    public Result login(@RequestBody Map<String, String> loginData) {
        String username = loginData.get("username");
        String password = loginData.get("password");
        
        // 验证输入参数
        if (username == null || username.isEmpty() || password == null || password.isEmpty()) {
            return Result.error("400", "用户名或密码不能为空");
        }
        
        // 调用service层验证登录
        Manager manager = managerService.login(username, password);
        
        if (manager != null) {
            // 登录成功，生成token（这里使用UUID简单生成，实际项目中应该使用更安全的方式）
            String token = UUID.randomUUID().toString().replaceAll("-", "");
            
            // 准备返回数据
            Map<String, Object> data = new HashMap<>();
            data.put("token", token);
            
            // 准备用户信息（不包含密码）
            Map<String, Object> userInfo = new HashMap<>();
            userInfo.put("id", manager.getId());
            userInfo.put("username", manager.getUsername());
            userInfo.put("role", "manager"); // 管理员角色标识
            
            data.put("userInfo", userInfo);
            
            return Result.success(data);
        } else {
            // 登录失败
            return Result.error("401", "用户名或密码错误");
        }
    }
}