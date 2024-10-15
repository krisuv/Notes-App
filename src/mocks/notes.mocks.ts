import { CardNote } from '@frontend-types/notes.types';
import { getFormattedDate } from '@utils/date.utils';
import { v4 as uuidv4 } from 'uuid';

export const mockNoteList: CardNote[] = [
  {
    id: uuidv4(),
    title: 'Meeting Notes',
    content: 'Discuss project timeline and milestones.',
    createdDate: getFormattedDate(new Date('2023-09-15T10:00:00'))
  },
  {
    id: uuidv4(),
    title: 'Shopping List',
    content: 'Milk, Bread, Eggs, Butter',
    createdDate: getFormattedDate(new Date('2023-09-20T12:30:00'))
  },
  {
    id: uuidv4(),
    title: 'Task Reminder',
    content: 'Complete the monthly report by end of the week.',
    createdDate: getFormattedDate(new Date('2023-09-25T14:45:00'))
  },
  {
    id: uuidv4(),
    title: 'Book Recommendations',
    content: 'The Great Gatsby, 1984, To Kill a Mockingbird',
    createdDate: getFormattedDate(new Date('2023-10-01T16:00:00'))
  },
  {
    id: '5',
    title: 'Workout Plan',
    content: 'Monday: Chest, Tuesday: Back, Wednesday: Legs',
    createdDate: getFormattedDate(new Date('2023-10-05T08:15:00'))
  }
];
