import { v4 as uuidv4 } from 'uuid';
import CommentsEventCalendar from './model/commentsEventCalendar';

class CommentsEventCalendarFactory {

    public static createCommentsEventCalendarFromData(data: {
        comment: string,
        user: string,
        event: string,
    }): CommentsEventCalendar {
        return new CommentsEventCalendar(uuidv4(), data.comment, data.user, data.event);
    }

    public static createCommentsEventCalendar(data: {
        uuid: string,
        comment: string,
        user: string,
        event: string,
    }): CommentsEventCalendar {
        return new CommentsEventCalendar(data.uuid, data.comment, data.user, data.event);
    }

    public static commentsEventCalendarToJson(commentsEventCalendar: CommentsEventCalendar) {
        return {
            uuid: commentsEventCalendar.getUuid(),
            comment: commentsEventCalendar.getComment(),
            user: commentsEventCalendar.getUser(),
            event: commentsEventCalendar.getEvent()
        }
    }

}

export default CommentsEventCalendarFactory;