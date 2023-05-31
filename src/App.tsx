import React, { createContext, useState } from 'react';
import Authorization from './components/Authorization';
import Main from './containers/Main';

export const AppContext = createContext({ apiTokenInstance: '', idInstance: '' });

function App() {
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');
  const [isAuth, setIsAuth] = useState(false);

  const handleOnIdChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setIdInstance(e.target.value);
  const handleOnApiChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setApiTokenInstance(e.target.value);

  const handleIsAuth = () => {
    if (apiTokenInstance && idInstance) setIsAuth(true);
    else alert('Please, enter your api token and id');
  };

  return (
    <>
      {isAuth ? (
        <AppContext.Provider value={{ apiTokenInstance, idInstance }}>
          <Main />
        </AppContext.Provider>
      ) : (
        <Authorization
          onClick={handleIsAuth}
          idInstance={idInstance}
          apiTokenInstance={apiTokenInstance}
          onIdChange={handleOnIdChange}
          onApiChange={handleOnApiChange}
        />
      )}
    </>
  );
}

export default App;
