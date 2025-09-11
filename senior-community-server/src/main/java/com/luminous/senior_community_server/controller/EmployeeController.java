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
@RequestMapping("/api/employees")
@CrossOrigin(origins = "*")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping
    public Result getAllEmployees(@RequestParam(defaultValue = "1") Integer pageNum,
                                @RequestParam(defaultValue = "10") Integer pageSize,
                                @RequestParam(required = false) String name){
        PageInfo<Employee> pageInfo = employeeService.selectPage(pageNum, pageSize);
        return Result.success(pageInfo);
    }

    @GetMapping("/{id}")
    public Result getEmployeeById(@PathVariable Integer id){
        Employee employee = employeeService.selectById(id);
        return Result.success(employee);
    }

    @PostMapping
    public Result createEmployee(@RequestBody Employee employee){
        employeeService.add(employee);
        return Result.success("员工创建成功");
    }

    @PutMapping("/{id}")
    public Result updateEmployee(@PathVariable Integer id, @RequestBody Employee employee){
        employee.setId(id);
        employeeService.update(employee);
        return Result.success("员工更新成功");
    }

    @DeleteMapping("/{id}")
    public Result deleteEmployee(@PathVariable Integer id){
        employeeService.delete(id);
        return Result.success("员工删除成功");
    }

}
