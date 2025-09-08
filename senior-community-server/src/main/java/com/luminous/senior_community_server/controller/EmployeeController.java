package com.luminous.senior_community_server.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.luminous.senior_community_server.bean.Employee;
import com.luminous.senior_community_server.common.Result;
import com.luminous.senior_community_server.service.EmployeeService;
import org.apache.coyote.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employee")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping("/selectAll")
    public Result selectAll(@RequestParam(defaultValue = "1") Integer pageNum,
                            @RequestParam(defaultValue = "10") Integer pageSize){
        PageInfo<Employee> pageInfo = employeeService.selectPage(pageNum, pageSize);
        return Result.success(pageInfo);
    }

    //    @GetMapping("/selectById/{id}")
    @GetMapping("/selectById")
//    public Result selectById(@PathVariable Integer id){
//    传对象可以参数随意查询
//    还有分页查询
    public Result selectById(@RequestParam Integer id, @RequestParam(required = false) String no){
        Employee employee = employeeService.selectById(id);
        return Result.success(employee);
    }

    @PostMapping("/add")
//    将前端传来的json字符串映射出java对象
    public Result add(@RequestBody Employee employee){
        employeeService.add(employee);
        return Result.success();
    }

    @PutMapping("/update")
    public Result update(@RequestParam Employee employee){
        employeeService.update(employee);
        return Result.success();
    }

    @DeleteMapping("/delete")
    public Result delete(@PathVariable Integer id){
        employeeService.delete(id);
        return Result.success();
    }

}
