package org.zalando.zmon.config;

import com.instana.opentracing.InstanaTracer;
import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;
import io.opentracing.util.ThreadLocalActiveSpanSource;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Created by elauria on 07/09/17.
 */
@Configuration
@EnableConfigurationProperties({InstanaProperties.class})
public class InstanaConfiguration {
    @Bean
    public Tracer instanaTracer() {
        Tracer tracer = new InstanaTracer(new ThreadLocalActiveSpanSource());
        GlobalTracer.register(tracer);
        return tracer;
    }
}
