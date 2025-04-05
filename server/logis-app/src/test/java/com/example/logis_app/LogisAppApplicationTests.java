package com.example.logis_app;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")  // Ensure you have a test profile to disable certain configurations
public class LogisAppApplicationTests {
	@Test
	void contextLoads() {
		// test logic
	}
}
