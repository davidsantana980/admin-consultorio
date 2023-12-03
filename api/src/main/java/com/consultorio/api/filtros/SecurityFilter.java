package com.consultorio.api.filtros;


import java.io.IOException;

import com.consultorio.api.jwt.JWTUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;


@Component
public class SecurityFilter extends OncePerRequestFilter {
    private final JWTUtil util;
    private final UserDetailsService userDetailsService;

    @Autowired
    public SecurityFilter(JWTUtil util, UserDetailsService userDetailsService) {
        this.util = util;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try{
            //saca el header
            String authHeader = request.getHeader("Authorization");
            String token = null;

            //guarda el token si existe tras Bearer
            if (StringUtils.hasText(authHeader) && authHeader.startsWith("Bearer ")) {
                token = authHeader.substring(7);
            }

            if (token != null) {
                String username = util.getSubject(token);
                //autentica al usuario si existe en la BDD
                if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    UserDetails user = userDetailsService.loadUserByUsername(username);
                    boolean isValid = util.isValidToken(token, user.getUsername()) && util.isValidToken(token);
                    if (isValid) {
                        UsernamePasswordAuthenticationToken authToken =
                                new UsernamePasswordAuthenticationToken(username, user.getPassword(), user.getAuthorities());
                        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authToken);
                    }
                }
            }
        }catch (Exception e){
            System.out.println("Error en el filtro de seguridad");
            e.printStackTrace();
        }finally {
            filterChain.doFilter(request, response);
        }
    }
}