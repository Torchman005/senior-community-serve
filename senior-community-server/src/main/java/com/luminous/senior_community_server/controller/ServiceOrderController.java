package com.luminous.senior_community_server.controller;

import com.luminous.senior_community_server.bean.ServiceOrder;
import com.luminous.senior_community_server.common.Result;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class ServiceOrderController {

    @GetMapping
    public Result getOrders(@RequestParam(required = false) Integer userId,
                                                @RequestParam(required = false) String status) {
        List<ServiceOrder> orders = new ArrayList<>();
        
        ServiceOrder order1 = new ServiceOrder();
        order1.setId(1001);
        order1.setUserId(1);
        order1.setServiceId(101);
        order1.setOrderNo("ORD" + System.currentTimeMillis());
        order1.setCustomerName("张三");
        order1.setCustomerPhone("13800138000");
        order1.setCustomerAddress("北京市朝阳区xxx街道xxx号");
        order1.setServiceDate(LocalDateTime.of(2023, 10, 25, 14, 0));
        order1.setServiceTime("14:00-16:00");
        order1.setDescription("需要在线医疗咨询，关于高血压用药问题");
        order1.setEmergencyContact("李四 13900139000");
        order1.setTotalAmount(new BigDecimal("50.00"));
        order1.setStatus("PENDING");
        order1.setPaymentStatus("UNPAID");
        order1.setCreateTime(LocalDateTime.now().minusDays(1));
        order1.setUpdateTime(LocalDateTime.now());
        
        ServiceOrder order2 = new ServiceOrder();
        order2.setId(1002);
        order2.setUserId(2);
        order2.setServiceId(102);
        order2.setOrderNo("ORD" + (System.currentTimeMillis() + 1000));
        order2.setCustomerName("王五");
        order2.setCustomerPhone("13700137000");
        order2.setCustomerAddress("上海市浦东新区xxx路xxx号");
        order2.setServiceDate(LocalDateTime.of(2023, 10, 28, 9, 0));
        order2.setServiceTime("09:00-11:00");
        order2.setDescription("需要上门体检服务，包含血压、血糖等常规检查");
        order2.setEmergencyContact("赵六 13600136000");
        order2.setTotalAmount(new BigDecimal("299.00"));
        order2.setStatus("CONFIRMED");
        order2.setPaymentStatus("PAID");
        order2.setCreateTime(LocalDateTime.now().minusDays(2));
        order2.setUpdateTime(LocalDateTime.now());
        
        orders.add(order1);
        orders.add(order2);
        
        // 根据用户ID过滤
        if (userId != null) {
            orders = orders.stream()
                    .filter(order -> order.getUserId().equals(userId))
                    .toList();
        }
        
        // 根据状态过滤
        if (status != null && !status.isEmpty()) {
            orders = orders.stream()
                    .filter(order -> order.getStatus().equals(status))
                    .toList();
        }
        
        return Result.success(orders);
    }

    @GetMapping("/{id}")
    public Result getOrderById(@PathVariable Integer id) {
        // 模拟根据ID查询订单
        ServiceOrder order = new ServiceOrder();
        order.setId(id);
        order.setUserId(1);
        order.setServiceId(101);
        order.setOrderNo("ORD" + System.currentTimeMillis());
        order.setCustomerName("张三");
        order.setCustomerPhone("13800138000");
        order.setCustomerAddress("北京市朝阳区xxx街道xxx号");
        order.setServiceDate(LocalDateTime.of(2023, 10, 25, 14, 0));
        order.setServiceTime("14:00-16:00");
        order.setDescription("需要在线医疗咨询，关于高血压用药问题");
        order.setEmergencyContact("李四 13900139000");
        order.setTotalAmount(new BigDecimal("50.00"));
        order.setStatus("PENDING");
        order.setPaymentStatus("UNPAID");
        order.setCreateTime(LocalDateTime.now().minusDays(1));
        order.setUpdateTime(LocalDateTime.now());
        
        return Result.success(order);
    }

    @PostMapping
    public Result createOrder(@RequestBody ServiceOrder order) {
        // 模拟创建订单
        order.setId((int) (Math.random() * 10000) + 1000);
        order.setOrderNo("ORD" + System.currentTimeMillis());
        order.setStatus("PENDING");
        order.setPaymentStatus("UNPAID");
        order.setCreateTime(LocalDateTime.now());
        order.setUpdateTime(LocalDateTime.now());
        
        return Result.success(order);
    }

    @PutMapping("/{id}")
    public Result updateOrder(@PathVariable Integer id, @RequestBody ServiceOrder order) {
        // 模拟更新订单
        order.setId(id);
        order.setUpdateTime(LocalDateTime.now());
        
        return Result.success("订单更新成功");
    }

    @PutMapping("/{id}/status")
    public Result updateOrderStatus(@PathVariable Integer id, @RequestParam String status) {
        // 模拟更新订单状态
        return Result.success("订单状态更新成功");
    }

    @PutMapping("/{id}/payment")
    public Result updatePaymentStatus(@PathVariable Integer id, @RequestParam String paymentStatus) {
        // 模拟更新支付状态
        return Result.success("支付状态更新成功");
    }

    @DeleteMapping("/{id}")
    public Result cancelOrder(@PathVariable Integer id) {
        // 模拟取消订单
        return Result.success("订单取消成功");
    }

    @GetMapping("/statistics")
    public Result getOrderStatistics() {
        // 模拟订单统计数据
        java.util.Map<String, Object> statistics = new java.util.HashMap<>();
        statistics.put("totalOrders", 156);
        statistics.put("pendingOrders", 23);
        statistics.put("completedOrders", 98);
        statistics.put("cancelledOrders", 12);
        statistics.put("totalRevenue", new BigDecimal("15680.50"));
        statistics.put("todayOrders", 8);
        
        return Result.success(statistics);
    }
}