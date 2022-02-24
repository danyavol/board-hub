import { Message } from "src/interfaces/core.interface";

export class MessageService {

    static parseMessage(message: string): Message | null {
        let parsedMessage: Message;

        try {
            parsedMessage = JSON.parse(message)
        } catch {
            return null;
        }

        return this.isValidMessage(parsedMessage) ? parsedMessage : null;
    }

    static isValidMessage(message: Message): boolean {
        if (
            typeof message !== 'object' ||
            typeof message.controller !== 'string' ||
            typeof message.action !== 'string'
        ) return false;

        return true;
    }
}