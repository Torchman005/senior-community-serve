package com.luminous.senior_community_server.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.luminous.senior_community_server.bean.Employee;
import com.luminous.senior_community_server.mapper.EmployeeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeMapper employeeMapper;

    public List<Employee> selectAll(){
        List<Employee> list = employeeMapper.selectAll();
        return list;
    }

    public Employee selectById(Integer id){
        Employee employee = employeeMapper.selectById(id);
        return employee;
    }

    //    数据分页
    public PageInfo<Employee> selectPage(Integer pageNum, Integer pagesize){
        PageHelper.startPage(pageNum, pagesize);
        List<Employee> employees = employeeMapper.selectAll();
        return PageInfo.of(employees);
    }

    public void add(Employee employee){
        employeeMapper.insert(employee);
    }

    public void update(Employee employee){
        employeeMapper.updateById(employee);
    }

    public void delete(Integer id){
        employeeMapper.deleteById(id);
    }
}
