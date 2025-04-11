import fastifyCookie from "@fastify/cookie";
import fastifyRateLimit from "@fastify/rate-limit";
import fastifyJwt from "@fastify/jwt";
import cors from "@fastify/cors";
import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { env } from "./env";
import { categoriesRoutes } from "./http/controllers/categories/categories.routes";
import { muscleGroupsRoutes } from "./http/controllers/muscle-groups/muscle-groups.routes";
import { usersRoutes } from "./http/controllers/users/users.routes";
import { exercisesRoutes } from "./http/controllers/exercises/exercises.routes";

export const app = fastify();

app.register(fastifyRateLimit, {
    max: 100,
    timeWindow: "1 minute",
    keyGenerator: (req) => req.ip,
    errorResponseBuilder: (req, context) => {
        return {
            code: 429,
            error: "Too Many Requests",
            message: `You have exceeded the limit of ${context.max} requests per minute.`
        }
    }
});

app.register(fastifyCookie, {
    secret: env.COOKIE_SECRET,
    parseOptions: {
        httpOnly: true,
        sameSite: "strict",
        path: "/"
    }
});

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    sign: {
        expiresIn: "7d"
    },
    cookie: {
        cookieName: "refreshToken",
        signed: true
    }
});

app.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        await request.jwtVerify();
    } catch (error) {
        return reply.status(401).send({ message: "Unauthorized" });
    }
})

app.register(cors, {
    origin: true,
    credentials: true
});

app.register(usersRoutes);
app.register(categoriesRoutes);
app.register(muscleGroupsRoutes);
app.register(exercisesRoutes);
