import React from 'react';
import './style.scss';

interface IAuthorization {
  idInstance: string;
  apiTokenInstance: string;
  onIdChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onApiChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
}

const Authorization = ({
  idInstance,
  apiTokenInstance,
  onIdChange,
  onApiChange,
  onClick
}: IAuthorization) => (
  <div className="authorization-wrapper">
    <h1>Log in</h1>
    <input
      value={idInstance}
      onChange={onIdChange}
      type="text"
      placeholder="Please, enter your id instance"
    />
    <input
      value={apiTokenInstance}
      onChange={onApiChange}
      type="text"
      placeholder="Please, enter your api token instance"
    />
    <button onClick={onClick} type="button">
      Log in
    </button>
  </div>
);

export default Authorization;
