import React from 'react';
import './style.scss';

interface IInput {
  onChange: () => void;
  value: string;
  placeholder: string;
  icon?: string;
}

const Input = ({ onChange, value, icon, placeholder }: IInput) => (
  <div className="input-wrapper">
    <input placeholder={placeholder} type="text" onChange={onChange} value={value} />
    {!!icon && (
      <div className="input-image-wrapper">
        <img src={icon} alt="Add contact" />
      </div>
    )}
  </div>
);

export default Input;
