import { FastifyInstance } from "fastify";
import { findAllUsersController } from "./find-all-users.controller";
import { findUserController } from "./find-user.controller";
import { refreshTokenUserController } from "./refresh-token-user.controller";
import { createUserController } from "./create-user.controller";
import { authenticateUserController } from "./authenticate-user.controller";
import { updateUserController } from "./update-user.controller";
import { deleteUserController } from "./delete-user.controller";

export async function usersRoutes(app: FastifyInstance) {
    app.get("/users", findAllUsersController);
    app.get("/users/:id", findUserController);
    app.post("/users/refresh-token", refreshTokenUserController);
    app.post("/users", createUserController);
    app.post("/users/authenticate", authenticateUserController);
    app.put("/users/:id", { preHandler: [app.authenticate] }, updateUserController);
    app.delete("/users/:id", { preHandler: [app.authenticate] }, deleteUserController);
}
