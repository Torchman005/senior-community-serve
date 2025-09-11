-- 插入测试用户数据
INSERT INTO `user` (name, sex, no, age, description, phone_number, username, password, role) 
VALUES 
('测试用户', '男', 'U001', 65, '测试用户账号', '13800138000', 'testuser', '123456', 'user'),
('张三', '女', 'U002', 70, '社区居民', '13900139000', 'zhangsan', 'password', 'user');

-- 插入测试管理员数据（如果需要）
INSERT INTO `manager` (username, password) 
VALUES 
('admin', 'admin123');