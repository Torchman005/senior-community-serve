package com.luminous.senior_community_server.mapper;

import com.luminous.senior_community_server.bean.Employee;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface EmployeeMapper {
    List<Employee> selectAll();

    @Select("select * from employee where id = #{id}")
    Employee selectById(Integer id);

    void insert(Employee employee);

    void updateById(Employee employee);

    @Delete("delete from `employee` where id = #{id}")
    void deleteById(Integer id);
}
