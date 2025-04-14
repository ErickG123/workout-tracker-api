import { FastifyTypedInstance } from "../../../@types/fastify-typed-instance";
import { findAllUsersController } from "./find-all-users.controller";
import { findUserController } from "./find-user.controller";
import { refreshTokenUserController } from "./refresh-token-user.controller";
import { createUserController } from "./create-user.controller";
import { authenticateUserController } from "./authenticate-user.controller";
import { updateUserController } from "./update-user.controller";
import { deleteUserController } from "./delete-user.controller";
import { authenticateUserSchema, createUserSchema, deleteUserSchema, findAllUsersSchema, findUserSchema, refreshTokenUserSchema, updateUserSchema } from "../../../docs/schemas/users.schema";

export async function usersRoutes(app: FastifyTypedInstance) {
    app.get("/users", {
        schema: findAllUsersSchema
    }, findAllUsersController);
    app.get("/users/:id", {
        schema: findUserSchema
    }, findUserController);
    app.post("/users/refresh-token", {
        schema: refreshTokenUserSchema
    }, refreshTokenUserController);
    app.post("/users", {
        schema: createUserSchema
    }, createUserController);
    app.post("/users/authenticate", {
        schema: authenticateUserSchema
    }, authenticateUserController);
    app.put("/users/:id", {
        preHandler: [app.authenticate],
        schema: updateUserSchema
    }, updateUserController);
    app.delete("/users/:id", {
        preHandler: [app.authenticate],
        schema: deleteUserSchema
    }, deleteUserController);
}
