package com.redway.backendformapplication.controller;

import com.redway.backendformapplication.AppConfigTest;
import com.redway.backendformapplication.domain.user.User;
import com.redway.backendformapplication.service.UserService;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class UserControllerTest extends AppConfigTest {

    private final static String URL_REGISTRATION = "/user";

    @Mock
    private UserService userService;

    @Test
    public void ShouldInsertAUser() throws Exception {
        User user = new User("name", "email@email.com");

        when(userService.saveUser(any(User.class))).thenReturn(user);

        ResultActions resultActions = mockMvc.perform(post(URL_REGISTRATION)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(user)));
        resultActions.andExpect(status().isCreated());
        assertThat(resultActions).isNotNull();
    }

    @Test
    public void ShouldGetAUser() throws Exception {
        User user = new User("name", "email@email.com");
        User user2 = new User("name", "email@email.com");

        List<User> users = List.of(user, user2);

        when(userService.findAll()).thenReturn(users);

        ResultActions resultActions = mockMvc.perform(get(URL_REGISTRATION)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(users)));
        resultActions.andExpect(status().isOk());
        assertThat(resultActions).isNotNull();

    }
}
