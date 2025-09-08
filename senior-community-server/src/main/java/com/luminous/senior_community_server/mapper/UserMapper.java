package com.luminous.senior_community_server.mapper;

import com.luminous.senior_community_server.bean.User;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Select;
import org.springframework.web.bind.annotation.DeleteMapping;

import java.util.List;

public interface UserMapper {
    List<User> selectAll();

    @Select("select * from user where id = #{id}")
    User selectById(Integer id);

    void insert(User user);

    void updateById(User user);

    @Delete("delete from `user` where id = #{id}")
    void deleteById(Integer id);
}
