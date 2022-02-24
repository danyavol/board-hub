import { UserActions } from "src/actions/user.action";
import { Controller, ControllerParams } from "src/interfaces/core.interface";

export const userController: Controller = (params: ControllerParams) => {
    const { server, socket, message } = params;

    switch(message.action) {
        case UserActions.Login:
            // Do something
            break;
        case UserActions.ChangeName:
            // Do something
            break;
    }
}