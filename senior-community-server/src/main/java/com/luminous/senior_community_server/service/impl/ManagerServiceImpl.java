package com.luminous.senior_community_server.service.impl;

import com.luminous.senior_community_server.bean.Manager;
import com.luminous.senior_community_server.mapper.ManagerMapper;
import com.luminous.senior_community_server.service.ManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ManagerServiceImpl implements ManagerService {

    @Autowired
    private ManagerMapper managerMapper;

    @Override
    public Manager login(String username, String password) {
        // 根据用户名查询管理员
        Manager manager = managerMapper.selectByUsername(username);
        
        // 验证管理员是否存在且密码正确
        if (manager != null && password.equals(manager.getPassword())) {
            return manager;
        }
        
        return null;
    }

    @Override
    public Manager findByUsername(String username) {
        return managerMapper.selectByUsername(username);
    }

    @Override
    public void addManager(Manager manager) {
        managerMapper.insert(manager);
    }

    @Override
    public void updateManager(Manager manager) {
        managerMapper.updateById(manager);
    }
}