package com.luminous.senior_community_server.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.luminous.senior_community_server.bean.User;
import com.luminous.senior_community_server.common.Result;
import com.luminous.senior_community_server.mapper.UserMapper;
import com.luminous.senior_community_server.service.UserService;
import org.apache.coyote.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public Result getAllUsers(@RequestParam(defaultValue = "1") Integer pageNum,
                            @RequestParam(defaultValue = "10") Integer pageSize,
                            @RequestParam(required = false) String name){
        PageInfo<User> pageInfo = userService.selectPage(pageNum, pageSize);
        return Result.success(pageInfo);
    }

    @GetMapping("/{id}")
    public Result getUserById(@PathVariable Integer id){
        User user = userService.selectById(id);
        return Result.success(user);
    }

    @PostMapping
    public Result createUser(@RequestBody User user){
        userService.add(user);
        return Result.success("用户创建成功");
    }

    @PutMapping("/{id}")
    public Result updateUser(@PathVariable Integer id, @RequestBody User user){
        user.setId(id);
        userService.update(user);
        return Result.success("用户更新成功");
    }

    @DeleteMapping("/{id}")
    public Result deleteUser(@PathVariable Integer id){
        userService.delete(id);
        return Result.success("用户删除成功");
    }

    @PostMapping("/login")
    public Result login(@RequestBody Map<String, String> loginData) {
        String username = loginData.get("username");
        String password = loginData.get("password");
        
        User user = userService.login(username, password);
        if (user != null) {
            Map<String, Object> result = new HashMap<>();
            result.put("user", user);
            result.put("token", "user_token_" + user.getId());
            return Result.success(result);
        } else {
            return Result.error("401", "用户名或密码错误");
        }
    }

}
