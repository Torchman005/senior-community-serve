package com.luminous.senior_community_server.controller;

import com.luminous.senior_community_server.bean.Service;
import com.luminous.senior_community_server.bean.ServiceCategory;
import com.luminous.senior_community_server.common.Result;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "*")
public class ServiceController {

    @GetMapping("/categories")
    public Result getCategories() {
        List<ServiceCategory> categories = new ArrayList<>();
        
        ServiceCategory category1 = new ServiceCategory();
        category1.setId(1);
        category1.setName("医疗健康");
        category1.setIcon("Medicine");
        category1.setStatus("ACTIVE");
        categories.add(category1);
        
        ServiceCategory category2 = new ServiceCategory();
        category2.setId(2);
        category2.setName("生活照料");
        category2.setIcon("House");
        category2.setStatus("ACTIVE");
        categories.add(category2);
        
        ServiceCategory category3 = new ServiceCategory();
        category3.setId(3);
        category3.setName("紧急维修");
        category3.setIcon("Tools");
        category3.setStatus("ACTIVE");
        categories.add(category3);
        
        ServiceCategory category4 = new ServiceCategory();
        category4.setId(4);
        category4.setName("其他服务");
        category4.setIcon("More");
        category4.setStatus("ACTIVE");
        categories.add(category4);
        
        return Result.success(categories);
    }

    @GetMapping
    public Result getServices(@RequestParam(required = false) Integer categoryId) {
        List<Service> services = new ArrayList<>();
        
        // 医疗健康服务
        Service service1 = new Service();
        service1.setId(101);
        service1.setCategoryId(1);
        service1.setTitle("在线医疗咨询");
        service1.setDescription("专业医生在线解答健康问题，提供用药建议");
        service1.setPrice(new BigDecimal("50"));
        service1.setUnit("次");
        service1.setRating(4.8);
        service1.setImage("/images/services/online-consultation.jpg");
        service1.setProvider("健康在线医疗集团");
        service1.setStatus("ACTIVE");
        service1.setCreateTime(LocalDateTime.now());
        
        Service service2 = new Service();
        service2.setId(102);
        service2.setCategoryId(1);
        service2.setTitle("上门体检服务");
        service2.setDescription("专业医护人员上门提供体检服务，包含常规体检项目");
        service2.setPrice(new BigDecimal("299"));
        service2.setUnit("次");
        service2.setRating(4.7);
        service2.setImage("/images/services/home-medical.jpg");
        service2.setProvider("康泰医疗服务");
        service2.setStatus("ACTIVE");
        service2.setCreateTime(LocalDateTime.now());
        
        // 生活照料服务
        Service service3 = new Service();
        service3.setId(201);
        service3.setCategoryId(2);
        service3.setTitle("家政清洁服务");
        service3.setDescription("专业家政人员提供全面的家庭清洁服务");
        service3.setPrice(new BigDecimal("120"));
        service3.setUnit("次");
        service3.setRating(4.6);
        service3.setImage("/images/services/housekeeping.jpg");
        service3.setProvider("优质家政服务公司");
        service3.setStatus("ACTIVE");
        service3.setCreateTime(LocalDateTime.now());
        
        services.add(service1);
        services.add(service2);
        services.add(service3);
        
        // 根据分类过滤
        if (categoryId != null) {
            services = services.stream()
                    .filter(service -> service.getCategoryId().equals(categoryId))
                    .toList();
        }
        
        return Result.success(services);
    }

    @GetMapping("/{id}")
    public Result getServiceById(@PathVariable Integer id) {
        // 模拟根据ID查询服务
        Service service = new Service();
        service.setId(id);
        service.setCategoryId(1);
        service.setTitle("在线医疗咨询");
        service.setDescription("专业医生在线解答健康问题，提供用药建议");
        service.setPrice(new BigDecimal("50"));
        service.setUnit("次");
        service.setRating(4.8);
        service.setImage("/images/services/online-consultation.jpg");
        service.setProvider("健康在线医疗集团");
        service.setStatus("ACTIVE");
        service.setCreateTime(LocalDateTime.now());
        
        return Result.success(service);
    }

    @PostMapping
    public Result createService(@RequestBody Service service) {
        // 模拟创建服务
        service.setId((int) (Math.random() * 1000));
        service.setCreateTime(LocalDateTime.now());
        service.setUpdateTime(LocalDateTime.now());
        service.setStatus("ACTIVE");
        
        return Result.success("服务创建成功");
    }

    @PutMapping("/{id}")
    public Result updateService(@PathVariable Integer id, @RequestBody Service service) {
        // 模拟更新服务
        service.setId(id);
        service.setUpdateTime(LocalDateTime.now());
        
        return Result.success("服务更新成功");
    }

    @DeleteMapping("/{id}")
    public Result deleteService(@PathVariable Integer id) {
        // 模拟删除服务
        return Result.success("服务删除成功");
    }
}