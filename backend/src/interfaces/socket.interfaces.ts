export interface ServerToClientEvents {
  message: (item: string, id: string) => void;
}

export interface ClientToServerEvents {
  message: (item: string, id: string) => void;
}
