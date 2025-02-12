import { openDB } from 'idb';
import { ChatDBSchema } from '../types/db';

const DB_NAME = 'chat-history';
const STORE_NAME = 'messages';

export const dbService = {
  async init() {
    return openDB<ChatDBSchema>(DB_NAME, 1, {
      upgrade(db) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('by-timestamp', 'timestamp');
      },
    });
  },

  async saveMessage(message: ChatDBSchema['messages']['value']) {
    const db = await this.init();
    await db.put(STORE_NAME, message);
  },

  async getMessages(page: number = 0, limit: number = 20) {
    const db = await this.init();
    const messages: ChatDBSchema['messages']['value'][] = [];
    
    let cursor = await db.transaction(STORE_NAME)
      .store
      .index('by-timestamp')
      .openCursor(null, 'prev');

    const skip = page * limit;
    let count = 0;

    while (cursor && messages.length < limit) {
      if (count < skip) {
        count++;
        cursor = await cursor.continue();
        continue;
      }
      
      messages.push(cursor.value);
      cursor = await cursor.continue();
    }

    console.log('Retrieved messages:', messages);
    return messages;
  },

  async getAllMessages() {
    const db = await this.init();
    return db.getAll(STORE_NAME);
  },

  async clearMessages() {
    const db = await this.init();
    await db.clear(STORE_NAME);
  }
}; 