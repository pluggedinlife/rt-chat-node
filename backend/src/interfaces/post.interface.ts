export interface Message {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  value: string;
  username: string;
  nick: string;
}
