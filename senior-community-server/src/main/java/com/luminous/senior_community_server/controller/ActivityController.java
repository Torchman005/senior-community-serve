package com.luminous.senior_community_server.controller;

import com.luminous.senior_community_server.bean.Activity;
import com.luminous.senior_community_server.bean.ActivityType;
import com.luminous.senior_community_server.bean.ActivityParticipation;
import com.luminous.senior_community_server.common.Result;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/activities")
@CrossOrigin(origins = "*")
public class ActivityController {

    @GetMapping("/types")
    public Result getActivityTypes() {
        List<ActivityType> types = new ArrayList<>();
        
        ActivityType type1 = new ActivityType();
        type1.setId(1);
        type1.setName("线上活动");
        type1.setIcon("VideoPlay");
        type1.setStatus("ACTIVE");
        types.add(type1);
        
        ActivityType type2 = new ActivityType();
        type2.setId(2);
        type2.setName("线下活动");
        type2.setIcon("Location");
        type2.setStatus("ACTIVE");
        types.add(type2);
        
        ActivityType type3 = new ActivityType();
        type3.setId(3);
        type3.setName("创意工坊");
        type3.setIcon("Brush");
        type3.setStatus("ACTIVE");
        types.add(type3);
        
        return Result.success(types);
    }

    @GetMapping
    public Result getActivities(@RequestParam(required = false) Integer typeId) {
        List<Activity> activities = new ArrayList<>();
        
        // 线上活动
        Activity activity1 = new Activity();
        activity1.setId(101);
        activity1.setTypeId(1);
        activity1.setTitle("书画直播课：山水画技法");
        activity1.setDescription("著名山水画家王老师在线教授山水画基本技法，适合初学者");
        activity1.setStartTime(LocalDateTime.of(2023, 10, 15, 14, 0));
        activity1.setEndTime(LocalDateTime.of(2023, 10, 15, 16, 0));
        activity1.setLocation("线上直播");
        activity1.setImage("/images/activities/painting-class.jpg");
        activity1.setOrganizer("乐龄文化协会");
        activity1.setParticipants(45);
        activity1.setMaxParticipants(100);
        activity1.setIsOnline(true);
        activity1.setStatus("UPCOMING");
        activity1.setCreateTime(LocalDateTime.now());
        
        Activity activity2 = new Activity();
        activity2.setId(102);
        activity2.setTypeId(1);
        activity2.setTitle("线上读书会：《平凡的世界》");
        activity2.setDescription("共同阅读讨论路遥的名著《平凡的世界》，分享阅读感受");
        activity2.setStartTime(LocalDateTime.of(2023, 10, 18, 19, 0));
        activity2.setEndTime(LocalDateTime.of(2023, 10, 18, 21, 0));
        activity2.setLocation("线上会议室");
        activity2.setImage("/images/activities/book-club.jpg");
        activity2.setOrganizer("银发读书社");
        activity2.setParticipants(32);
        activity2.setMaxParticipants(50);
        activity2.setIsOnline(true);
        activity2.setStatus("UPCOMING");
        activity2.setCreateTime(LocalDateTime.now());
        
        // 线下活动
        Activity activity3 = new Activity();
        activity3.setId(201);
        activity3.setTypeId(2);
        activity3.setTitle("社区健步走活动");
        activity3.setDescription("组织社区老年人进行健步走锻炼，促进身心健康");
        activity3.setStartTime(LocalDateTime.of(2023, 10, 20, 8, 0));
        activity3.setEndTime(LocalDateTime.of(2023, 10, 20, 10, 0));
        activity3.setLocation("社区公园");
        activity3.setImage("/images/activities/walking.jpg");
        activity3.setOrganizer("健康生活协会");
        activity3.setParticipants(28);
        activity3.setMaxParticipants(40);
        activity3.setIsOnline(false);
        activity3.setStatus("UPCOMING");
        activity3.setCreateTime(LocalDateTime.now());
        
        activities.add(activity1);
        activities.add(activity2);
        activities.add(activity3);
        
        // 根据类型过滤
        if (typeId != null) {
            activities = activities.stream()
                    .filter(activity -> activity.getTypeId().equals(typeId))
                    .toList();
        }
        
        return Result.success(activities);
    }

    @GetMapping("/{id}")
    public Result getActivityById(@PathVariable Integer id) {
        // 模拟根据ID查询活动
        Activity activity = new Activity();
        activity.setId(id);
        activity.setTypeId(1);
        activity.setTitle("书画直播课：山水画技法");
        activity.setDescription("著名山水画家王老师在线教授山水画基本技法，适合初学者");
        activity.setStartTime(LocalDateTime.of(2023, 10, 15, 14, 0));
        activity.setEndTime(LocalDateTime.of(2023, 10, 15, 16, 0));
        activity.setLocation("线上直播");
        activity.setImage("/images/activities/painting-class.jpg");
        activity.setOrganizer("乐龄文化协会");
        activity.setParticipants(45);
        activity.setMaxParticipants(100);
        activity.setIsOnline(true);
        activity.setStatus("UPCOMING");
        activity.setCreateTime(LocalDateTime.now());
        
        return Result.success(activity);
    }

    @PostMapping
    public Result createActivity(@RequestBody Activity activity) {
        // 模拟创建活动
        activity.setId((int) (Math.random() * 1000));
        activity.setCreateTime(LocalDateTime.now());
        activity.setUpdateTime(LocalDateTime.now());
        activity.setStatus("UPCOMING");
        activity.setParticipants(0);
        
        return Result.success("活动创建成功");
    }

    @PutMapping("/{id}")
    public Result updateActivity(@PathVariable Integer id, @RequestBody Activity activity) {
        // 模拟更新活动
        activity.setId(id);
        activity.setUpdateTime(LocalDateTime.now());
        
        return Result.success("活动更新成功");
    }

    @DeleteMapping("/{id}")
    public Result deleteActivity(@PathVariable Integer id) {
        // 模拟删除活动
        return Result.success("活动删除成功");
    }

    @PostMapping("/{id}/participate")
    public Result participateActivity(@PathVariable Integer id, @RequestParam Integer userId) {
        // 模拟参与活动
        ActivityParticipation participation = new ActivityParticipation();
        participation.setUserId(userId);
        participation.setActivityId(id);
        participation.setStatus("REGISTERED");
        participation.setRegistrationTime(LocalDateTime.now());
        
        return Result.success("报名成功");
    }

    @DeleteMapping("/{id}/participate")
    public Result cancelParticipation(@PathVariable Integer id, @RequestParam Integer userId) {
        // 模拟取消参与
        return Result.success("取消报名成功");
    }
}