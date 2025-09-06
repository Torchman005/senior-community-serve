package com.luminous.senior_community_server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class SeniorCommunityServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(SeniorCommunityServerApplication.class, args);
	}

}
