import React, { useContext, useEffect, useState } from 'react';
import './style.scss';
import { AppContext } from '../../App';
import InputWithIcon from '../../components/InputWithIcon';
import ListItem from '../../components/ListItem';
import Message from '../../components/Message';

import { checkStringFormat, generateId } from '../../helpers/general';
import send from '../../assets/send.png';
import tick from '../../assets/tick.png';
import { fetchReceiveNotification, fetchSendMessage } from '../../helpers/fetch';

const Main = () => {
  const { idInstance, apiTokenInstance } = useContext(AppContext);
  const [currentContact, setCurrentContact] = useState('');
  const [contactsList, setContactsList] = useState<string[]>([]);
  const [addContactValue, setAddContactValue] = useState('');
  const [sendMessageValue, setSendMessageValue] = useState('');
  const [currentDialogMessages, setCurrentDialogMessages] = useState<
    { text: string; isRight: boolean; id: string; current: string }[]
  >([]);

  const handleChange =
    (setState: (value: string) => void, validate: boolean) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      validate ? setState(checkStringFormat(e.target.value)) : setState(e.target.value);

  const handleAddContactClick = (value: string) => {
    if (!value) {
      alert('Please, enter the phone number');
    } else if (!contactsList.includes(value)) {
      setContactsList((prev) => [...prev, value]);
      setAddContactValue('');
    } else alert('This contact has already existed');
  };

  const handleContactItemClick = (value: string) => {
    setCurrentContact(value);
  };

  const handleSendMessageClick = async () => {
    const body = {
      chatId: `${currentContact}@c.us`,
      message: sendMessageValue
    };
    if (!sendMessageValue) return;

    const response = await fetchSendMessage(idInstance, apiTokenInstance, body);
    if (response) {
      setCurrentDialogMessages((prev) => [
        ...prev,
        { id: generateId(), text: sendMessageValue, isRight: true, current: currentContact }
      ]);
      setSendMessageValue('');
    }
  };

  useEffect(() => {
    if (!(idInstance && apiTokenInstance)) return;
    const f = async () => {
      const data = await fetchReceiveNotification(idInstance, apiTokenInstance);
      if (!data) return;
      const { textMessage, chatId } = data;

      setCurrentDialogMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          text: textMessage,
          isRight: false,
          current: chatId
        }
      ]);
    };

    const intervalId = setInterval(() => f().catch((e) => console.error(e)), 5500);
    return () => clearInterval(intervalId);
  }, [apiTokenInstance, idInstance]);

  useEffect(() => {
    if (currentDialogMessages.length) {
      currentDialogMessages.forEach(({ current }) => {
        if (!contactsList.includes(current)) setContactsList((prev) => [...prev, current]);
      });
    }
  }, [contactsList.length, currentDialogMessages.length]);

  return (
    <div className="main-grid-wrapper">
      <div className="main-contact-list">
        <InputWithIcon
          alt="Add contact"
          icon={tick}
          placeholder="Add new contact, ex: 7xxxxxxxxxx"
          onChange={handleChange(setAddContactValue, true)}
          onClick={handleAddContactClick}
          value={addContactValue}
        />
        {contactsList.map((el) => (
          <ListItem
            isSelected={currentContact === el}
            onClick={handleContactItemClick}
            contact={el}
            key={el}
          />
        ))}
      </div>
      <div className="main-dialog">
        <div className="main-dialog-current-contact">{currentContact || 'Select chat'}</div>
        <div className="main-dialog-content">
          {currentDialogMessages
            .filter(({ current }) => current === currentContact)
            .map(({ text, id, isRight }) => <Message key={id} text={text} isRight={isRight} />)
            .reverse()}
        </div>
        <InputWithIcon
          disabled={!currentContact}
          onChange={handleChange(setSendMessageValue, false)}
          onClick={handleSendMessageClick}
          value={sendMessageValue}
          placeholder="Send a message"
          icon={send}
          alt="Send message"
        />
      </div>
    </div>
  );
};

export default Main;
