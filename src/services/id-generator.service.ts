const capitalLetters = 'ABCDEFGHIJKLMNPQRSTUVWXYZ';
const smallLetters = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';

export class IdGenerator {
    static createUserId(existingUserIds?: string[]): string {
        const characters = capitalLetters + smallLetters + numbers;
        const idLength = 8;

        return generateId(characters, idLength, existingUserIds);
    }

    static createLobbyId(existingLobbyIds?: string[]): string {
        const characters = capitalLetters + smallLetters + numbers;
        const idLength = 6;

        return generateId(characters, idLength, existingLobbyIds);
    }
}


function generateId(characters: string, codeLength: number, existingCodes: string[] = []): string {
    let id: string;
    do {
        id = generate(characters, codeLength);
    } while(existingCodes.includes(id))
    return id;
}

function generate(characters: string, codeLength: number): string {
    let result = '';
    for (let i = 0; i < codeLength; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
