package com.luminous.senior_community_server.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.luminous.senior_community_server.bean.User;
import com.luminous.senior_community_server.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserMapper userMapper;

    public List<User> selectAll(){
        List<User> list = userMapper.selectAll();
        return list;
    }

    public User selectById(Integer id){
        User user = userMapper.selectById(id);
        return user;
    }

    //    数据分页
    public PageInfo<User> selectPage(Integer pageNum, Integer pagesize){
        PageHelper.startPage(pageNum, pagesize);
        List<User> users = userMapper.selectAll();
        return PageInfo.of(users);
    }

    public void add(User user){
        userMapper.insert(user);
    }

    public void update(User user){
        userMapper.updateById(user);
    }

    public void delete(Integer id){
        userMapper.deleteById(id);
    }

    public User login(String username, String password) {
        User user = userMapper.selectByUsername(username);
        if (user != null && password.equals(user.getPassword())) {
            return user;
        }
        return null;
    }

    public User selectByUsername(String username) {
        return userMapper.selectByUsername(username);
    }
}
