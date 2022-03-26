import { IdGenerator } from "@services/id-generator.service";
import { User } from "src/interfaces/users.interface";
import uuid from 'uuid';

class UsersStore {
    private users: User[] = [];

    public createUser(username: string): User {
        username = this.formatUsername(username);
        this.validateUsername(username);

        const user: User = {
            sessionId: uuid.v4(),
            userId: IdGenerator.createUserId(this.users.map(u => u.userId)),
            username
        };

        this.users.push(user);
        return user;
    }

    public changeUsername(userId: string, username: string): void {
        username = this.formatUsername(username);
        this.validateUsername(username);

        const user = this.findUser(u => u.userId === userId);
        if (!user) throw new Error('User not found');

        user.username = username;
    }

    public findUser(searchCriteria: (user: User) => boolean): User | null {
        return this.users.find(searchCriteria) || null;
    }

    private validateUsername(username: string): void {
        if (username.length < 2) throw new Error('Invalid username. Minimum length 2 characters');
        if (username.length > 30) throw new Error('Invalid username. Maximum length 30 characters');
    }

    private formatUsername(username: string): string {
        return username.trim();
    }

}

export const usersStore = new UsersStore();
