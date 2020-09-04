export interface Message {
  content: string;
  at: Date;
  read: boolean;
  attachment: string;
}

export interface User {
  guid: string;
  name: string;
  image: string;
}
