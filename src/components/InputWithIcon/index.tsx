import React from 'react';
import './style.scss';

interface IInput {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (value: string) => void;
  value: string;
  placeholder: string;
  icon: string;
  alt: string;
  disabled?: boolean;
}

const InputWithIcon = ({
  onChange,
  value,
  icon,
  placeholder,
  alt,
  onClick,
  disabled = false
}: IInput) => {
  const handleClick = () => {
    onClick(value);
  };

  const handleKeyPress = (e: { key: string }) => {
    if (e.key === 'Enter') onClick(value);
  };

  return (
    <div className="input-wrapper">
      <input
        onKeyPress={handleKeyPress}
        disabled={disabled}
        placeholder={placeholder}
        type="text"
        onChange={onChange}
        value={value}
      />
      <button onClick={handleClick} className="input-image-button">
        <img src={icon} alt={alt} />
      </button>
    </div>
  );
};

export default InputWithIcon;
