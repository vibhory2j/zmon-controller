package org.zalando.zmon.security;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 
 * @author jbellmann
 *
 */
@Controller
public class SigninController {

	@RequestMapping(value="/signin")
	public String signin(){
		return "signin";
	}
}