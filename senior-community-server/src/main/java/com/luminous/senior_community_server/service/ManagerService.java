package com.luminous.senior_community_server.service;

import com.luminous.senior_community_server.bean.Manager;

public interface ManagerService {
    
    /**
     * 管理员登录验证
     * @param username 用户名
     * @param password 密码
     * @return 验证结果，成功返回管理员信息，失败返回null
     */
    Manager login(String username, String password);

    /**
     * 根据用户名查询管理员
     * @param username 用户名
     * @return 管理员信息
     */
    Manager findByUsername(String username);

    /**
     * 添加管理员
     * @param manager 管理员信息
     */
    void addManager(Manager manager);

    /**
     * 更新管理员信息
     * @param manager 管理员信息
     */
    void updateManager(Manager manager);
}