let ws: WebSocket | null = null;

export const getWebsocket = (token: string) => {
  if (!ws || ws.readyState === WebSocket.CLOSED) {
    return (ws = new WebSocket(`ws://localhost:5000/chat?token=${token}`));
  }
};
