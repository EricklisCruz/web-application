package com.redway.backendformapplication;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.redway.backendformapplication.repository.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.clearAllCaches;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
@ActiveProfiles("test")
public class AppConfigTest {

    @Autowired
    protected MockMvc mockMvc;

    @Autowired
    protected ObjectMapper objectMapper;

    @Mock
    protected UserRepository userRepository;


    @BeforeEach
    public void setup() {
        userRepository.deleteAll();
    }

    @AfterEach
    public void afterEach() {
        clearAllCaches();
    }

}
