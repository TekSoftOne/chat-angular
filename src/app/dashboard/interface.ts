export interface Message {
  content: string;
  at: Date;
  read: boolean;
  attachment: string;
}

export interface User {
  guid: string;
  lastAccess: Date;
  lastMessage: string;
}
