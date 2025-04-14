import { app } from "./app";
import { env } from "./env";

app.listen({ port: env.PORT }).then(() => {
    console.log("HTTP Server Running at: http://localhost:3333");
    console.log("API Documentation Running at: http://localhost:3333/docs")
});
