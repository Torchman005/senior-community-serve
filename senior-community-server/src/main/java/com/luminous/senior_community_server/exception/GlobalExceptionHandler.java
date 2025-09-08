package com.luminous.senior_community_server.exception;

import com.luminous.senior_community_server.common.Result;
import jdk.jshell.spi.ExecutionControl;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

//全局统一处理标识
@ControllerAdvice("com.luminous.controller")
public class GlobalExceptionHandler {
    @ExceptionHandler(Exception.class)
    @ResponseBody // 返回json数据
    public Result error(Exception e){
        e.printStackTrace();
        return Result.error();
    }

    @ExceptionHandler(CustomException.class)
    @ResponseBody // 返回json数据
    public Result error(CustomException e){
        e.printStackTrace();
        return Result.error(e.getCode(), e.getMsg());
    }
}
