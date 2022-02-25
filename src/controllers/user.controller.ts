import { UserActions } from "src/actions/user.action";
import { Controller, ControllerParams } from "src/interfaces/core.interface";

export const userController: Controller = (params: ControllerParams) => {
    const { server, socket, message } = params;

    switch(message.action) {
        case UserActions.Login:
            console.log(1, message);
            break;
        case UserActions.ChangeName:
            console.log(2, message);
            break;
    }
}