import { FastifyDynamicSwaggerOptions } from "@fastify/swagger";
import { jsonSchemaTransform } from "fastify-type-provider-zod";

export const swaggerOptions: FastifyDynamicSwaggerOptions = {
    openapi: {
        openapi: "3.0.0",
        info: {
            title: "Workout Tracker API",
            description: "Workout Tracker API Documentation",
            version: "1.0.0",
        },
        components: {
            securitySchemes: {
                cookieAuth: {
                    type: "apiKey",
                    in: "cookie",
                    name: "refreshToken",
                },
            },
        }
    },
    transform: jsonSchemaTransform,
}
