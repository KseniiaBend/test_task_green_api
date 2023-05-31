export const checkStringFormat = (str: string) => {
  const regex = /^[0-9][0-9\s]*[0-9]$/;
  return regex.test(str) ? str : str.replace(/\D/g, '');
};

let lastId = 0;
export const generateId = (prefix = 'id') => `${prefix}${++lastId}`;
