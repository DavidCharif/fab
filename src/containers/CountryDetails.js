import React from 'react';
import { CountryItem } from '../components/CountryItem';

export const CountryList = ({accounts}) => {
  if (accounts.length === 0) {
    return <>No hay data</>;
  }
  
  return (
    <section>
      
      {/* {lists.map((item) => (
        <CountryItem key={item.id} item={item} />
      ))} */}
      <CountryItem accounts={accounts} />
      
    </section>
  );
};
