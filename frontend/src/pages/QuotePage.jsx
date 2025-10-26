import React from 'react';
import { useLocation } from 'react-router-dom';
import { DetailedQuoteForm } from '../components';

const QuotePage = () => {
  const location = useLocation();
  const user = location.state?.user;

  return <DetailedQuoteForm user={user} />;
};

export default QuotePage;
