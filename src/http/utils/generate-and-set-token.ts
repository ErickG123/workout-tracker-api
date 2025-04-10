import { FastifyReply } from "fastify";

interface GenerateAndSetTokenParams {
    reply: FastifyReply;
    user: {
        id: string;
        name: string;
        email: string;
    };
}

export async function generateAndSetTokens({ reply, user }: GenerateAndSetTokenParams) {
    const accessToken = await reply.jwtSign(
        {
            name: user.name,
            email: user.email
        },
        {
            sign: {
                sub: user.id,
                expiresIn: "15m"
            }
        }
    );

    const refreshToken = await reply.jwtSign(
        {
            sub: user.id
        },
        {
            sign: {
                expiresIn: "7d"
            }
        }
    );

    reply.setCookie("refreshToken", refreshToken, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: false,
        signed: true
    });

    return accessToken;
}
