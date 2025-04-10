import { FastifyReply, FastifyRequest } from "fastify";

export async function refreshTokenUserController(request: FastifyRequest, reply: FastifyReply) {
    await request.jwtVerify({ onlyCookie: true });

    const newAccessToken = await reply.jwtSign(
        {},
        {
            sign: {
                sub: request.user.sub,
                expiresIn: "15m",
            },
        }
    );

    return reply.send({ token: newAccessToken });
}
