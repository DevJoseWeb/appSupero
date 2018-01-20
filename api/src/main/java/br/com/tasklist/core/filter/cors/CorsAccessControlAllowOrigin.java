package br.com.tasklist.core.filter.cors;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
//tasklist - 19/01/2018 - SUPERO
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD, ElementType.TYPE})
public @interface CorsAccessControlAllowOrigin {

    String origin() default "*";
    
}
