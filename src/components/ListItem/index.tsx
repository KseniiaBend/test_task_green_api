import React from 'react';
import './style.scss';
import Avatar from '../Avatar';

interface IListItem {
  contact: string;
  onClick: (value: string) => void;
  isSelected?: boolean;
}

const ListItem = ({ contact, onClick, isSelected = false }: IListItem) => {
  const handleOnClick = () => onClick(contact);

  return (
    <div
      onClick={handleOnClick}
      className={`list-item-wrapper ${isSelected ? 'list-item-selected' : ''}`}>
      <Avatar />
      <div className="list-item-contact">{contact}</div>
    </div>
  );
};

export default ListItem;
