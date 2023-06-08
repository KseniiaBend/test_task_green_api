import {
  DELETE,
  deleteNotificationUrl,
  POST,
  receiveNotificationUrl,
  sendMessageUrl
} from '../apiConfig';

let isDeletePending = false;

export const fetchSendMessage = async (
  idInstance: string,
  apiTokenInstance: string,
  data: { chatId: string; message: string }
) => {
  if (!(idInstance && apiTokenInstance)) return;
  return await fetch(sendMessageUrl(idInstance, apiTokenInstance), {
    method: POST,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then((response) => {
      if (response.status === 200) return response.json();
      alert(`Error: Not delivered (${response.statusText || response.status})`);
      return null;
    })
    .catch((err) => {
      alert(`Error: Not delivered (${err.message})`);
      console.error(err);
    });
};

const fetchDeleteNotification = async (
  idInstance: string,
  apiTokenInstance: string,
  receiptId: string
) => {
  if (!(idInstance && apiTokenInstance && receiptId)) return;
  isDeletePending = true;
  return await fetch(deleteNotificationUrl(idInstance, apiTokenInstance, receiptId), {
    method: DELETE
  })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      isDeletePending = false;
    });
};

export const fetchReceiveNotification = async (idInstance: string, apiTokenInstance: string) => {
  if (!(idInstance && apiTokenInstance) || isDeletePending) return;

  return await fetch(receiveNotificationUrl(idInstance, apiTokenInstance))
    .then((response) => {
      if (response.status === 200) return response.json();
      alert(`Error: Not delivered (${response.statusText || response.status})`);
      return null;
    })
    .then((response) => {
      if (!response) return null;
      const deleteNotification = async () => {
        await fetchDeleteNotification(idInstance, apiTokenInstance, response?.receiptId);
      };
      deleteNotification().catch((e) => console.error(e));

      const { body } = response;
      const { textMessage } = body?.messageData?.textMessageData || {};
      const { chatId } = body?.senderData || {};

      return textMessage && chatId ? { textMessage, chatId: chatId.slice(0, -5) } : null;
    })
    .catch((err) => {
      console.error(err);
    });
};
