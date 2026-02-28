import { v4 as uuidv4 } from 'uuid';
import Messages from './model/messages';

class MessagesFactory {

    public static createMessagesFromData(data: {
        uuid: string,
        userSend: string,
        userReceive: string,
        message: string,
        date: string,
        status: string,
        fair: string
    }): Messages {
        return new Messages(uuidv4(), data.userSend, data.userReceive, data.message, data.date, data.status, data.fair);
    }

    public static createMessages(data: {
        uuid: string,
        userSend: string,
        userReceive: string,
        message: string,
        date: string,        
        status: string,
        fair: string
    }): Messages {
        return new Messages(data.uuid, data.userSend, data.userReceive, data.message, data.date, data.status, data.fair);
    }

    public static messagesToJson(messages: Messages) {
        const raw = messages.getDate() as string | Date;
        const dateStr = typeof raw === 'string'
            ? raw
            : new Date(raw).toISOString().slice(0, 19).replace('T', ' ');
        return {
            uuid: messages.getUuid(),
            userSend: messages.getUserSend(),
            userReceive: messages.getUserReceive(),
            message: messages.getMessage(),
            date: dateStr,
            status: messages.getStatus(),
            fair: messages.getFair()
        }
    }

}

export default MessagesFactory;