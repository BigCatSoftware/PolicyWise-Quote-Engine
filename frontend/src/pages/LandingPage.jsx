import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from '../components';
import '../components/QuoteForm.css'; // We can reuse the same styles for now

const LandingPage = () => {
  const [userInfo, setUserInfo] = useState({ firstName: '', lastName: '', email: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass user info to the next page via state
    navigate('/quote', { state: { user: userInfo } });
  };

  return (
    <form className="quote-form" onSubmit={handleSubmit}>
      <h2>Welcome!</h2>
      <p className="form-description">Start by telling us who you are. We'll guide you to your personalized quote.</p>
      <Input
        label="First Name"
        name="firstName"
        value={userInfo.firstName}
        onChange={handleChange}
        placeholder="Enter your first name"
      />
      <Input
        label="Last Name"
        name="lastName"
        value={userInfo.lastName}
        onChange={handleChange}
        placeholder="Enter your last name"
      />
      <Input
        label="Email Address"
        name="email"
        type="email"
        value={userInfo.email}
        onChange={handleChange}
        placeholder="Enter your email address"
      />
      <Button type="submit" variant="primary">
        Start My Quote
      </Button>
    </form>
  );
};

export default LandingPage;
