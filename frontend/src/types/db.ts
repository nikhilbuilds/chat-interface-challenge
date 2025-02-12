import { DBSchema } from 'idb';
import { Message } from './chat';

export interface ChatDBSchema extends DBSchema {
  messages: {
    key: string;
    value: Message;
    indexes: { 'by-timestamp': Date };
  };
} 