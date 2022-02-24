import { userController } from "./user.controller";

export enum Controllers {
    User = 'user'
}

export const controllersList = {
    [Controllers.User]: userController
};
