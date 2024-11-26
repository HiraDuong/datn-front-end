export interface Chat {
  userId: number;
  name: string;
  avatar: string;
  status: string;
  messages: Message[];
  active?: boolean;
}

export interface Message {
  text?: string;
  fromUser: boolean;
  type: 'text' | 'image' | 'file';
  content?: string; // Base64 hoặc tên file
}
