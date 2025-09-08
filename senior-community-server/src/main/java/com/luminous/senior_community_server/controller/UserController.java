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

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/selectAll")
    public Result selectAll(@RequestParam(defaultValue = "1") Integer pageNum,
                            @RequestParam(defaultValue = "10") Integer pageSize){
        PageInfo<User> pageInfo = userService.selectPage(pageNum, pageSize);
        return Result.success(pageInfo);
    }

//    @GetMapping("/selectById/{id}")
    @GetMapping("/selectById")
//    public Result selectById(@PathVariable Integer id){
//    传对象可以参数随意查询
//    还有分页查询
    public Result selectById(@RequestParam Integer id, @RequestParam(required = false) String no){
        User user = userService.selectById(id);
        return Result.success(user);
    }

    @PostMapping("/add")
//    将前端传来的json字符串映射出java对象
    public Result add(@RequestBody User user){
        userService.add(user);
        return Result.success();
    }

    @PutMapping("/update")
    public Result update(@RequestParam User user){
        userService.update(user);
        return Result.success();
    }

    @DeleteMapping("/delete")
    public Result delete(@PathVariable Integer id){
        userService.delete(id);
        return Result.success();
    }

}
