import { createContext, useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom'
 
const PageContext = createContext(['wallet', () => {}]);

export const PageProvider = ({ children }) => {
  const [page, setPage] = useState('wallet');
  const [history, setHistory] = useHistory()
  console.log({history})
  console.log("geting history")
  return (
    <PageContext.Provider value={[page, setPage, history, setHistory]}>
      {children}
    </PageContext.Provider>
  );
};

export const usePage = () => useContext(PageContext);
