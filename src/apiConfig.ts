const BASE_URL = 'https://api.green-api.com/';
export const POST = 'POST';
export const DELETE = 'DELETE';

export const sendMessageUrl = (idInstance: string, apiTokenInstance: string) =>
  `${BASE_URL}waInstance${idInstance}/sendMessage/${apiTokenInstance}`;

export const receiveNotificationUrl = (idInstance: string, apiTokenInstance: string) =>
  `${BASE_URL}waInstance${idInstance}/receiveNotification/${apiTokenInstance}`;

export const deleteNotificationUrl = (
  idInstance: string,
  apiTokenInstance: string,
  receiptId: string
) =>
  `${BASE_URL}waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}
`;
