import { Controllers } from "src/controllers/controllers";
import { UserActions } from "./user.action";

export const actionsList = {
    [Controllers.User]: UserActions
};
