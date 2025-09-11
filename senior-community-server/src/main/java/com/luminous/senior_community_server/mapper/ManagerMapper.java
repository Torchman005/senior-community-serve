package com.luminous.senior_community_server.mapper;

import com.luminous.senior_community_server.bean.Manager;

public interface ManagerMapper {
    
    /**
     * 根据用户名查询管理员
     * @param username 用户名
     * @return 管理员信息
     */
    Manager selectByUsername(String username);

    /**
     * 新增管理员
     * @param manager 管理员信息
     */
    void insert(Manager manager);

    /**
     * 更新管理员信息
     * @param manager 管理员信息
     */
    void updateById(Manager manager);
}