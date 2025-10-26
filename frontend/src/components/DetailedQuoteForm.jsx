import React, { useState, useEffect } from 'react';
import { Button, QuoteSkeleton } from './';
import { states, vehicleMakes, vehicleModels, vehicleColors } from '../config/formData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import './DetailedQuoteForm.css';

// --- Reusable Components ---
const Dropdown = ({ label, name, value, onChange, options, disabled }) => (
  <div className="input-wrapper">
    <label htmlFor={name}>{label}</label>
    <select id={name} name={name} value={value} onChange={onChange} className="input" disabled={disabled}>
      <option value="">-- Select an option --</option>
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

const AnimatedNumber = ({ value }) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    const duration = 1000; // 1 second animation
    const stepTime = 16; // ~60fps
    const steps = duration / stepTime;
    const increment = value / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        clearInterval(timer);
        setCurrentValue(value);
      } else {
        setCurrentValue(current);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return <div className="quote-amount">${currentValue.toFixed(2)}</div>;
};

const QuoteResult = ({ quoteDetails, onReset }) => {
  const data = [
    { name: 'Base', value: quoteDetails.base_premium, color: '#d9ba9b' },
    { name: 'State', value: quoteDetails.state_adjustment, color: '#c99d76' },
    { name: 'Make', value: quoteDetails.make_adjustment, color: '#b8865f' },
    { name: 'Model', value: quoteDetails.model_surcharge, color: '#a67353' },
  ];

  return (
    <div className="quote-result-container">
      <h3>Your Quote is Ready!</h3>
      <p>Your estimated monthly premium is:</p>
      <AnimatedNumber value={quoteDetails.final_premium} />
      
      <div style={{ width: '100%', height: 200, marginBottom: '2rem' }}>
        <ResponsiveContainer>
          <BarChart data={data} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="name" hide />
            <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ background: '#faf9f7', border: '1px solid #e8d4c0' }} />
            <Bar dataKey="value" barSize={20} radius={[0, 10, 10, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="quote-disclaimer">This is an estimate and is subject to final verification.</p>
      <Button onClick={onReset} variant="secondary">Start Over</Button>
    </div>
  );
};

// --- Main Form Component ---
const DetailedQuoteForm = ({ user }) => {
  const [formData, setFormData] = useState({ state: '', vehicleMake: '', vehicleModel: '', vehicleColor: '' });
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quoteDetails, setQuoteDetails] = useState(null);

  useEffect(() => {
    if (formData.vehicleMake) {
      setModels(vehicleModels[formData.vehicleMake] || []);
      setFormData(prev => ({ ...prev, vehicleModel: '' }));
    } else {
      setModels([]);
    }
  }, [formData.vehicleMake]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Simulate a slightly longer loading time for the skeleton effect
      await new Promise(res => setTimeout(res, 1500));

      const response = await fetch('/api/v1/quotes/detailed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...user, ...formData })
      });

      if (!response.ok) throw new Error('Could not calculate quote. Please try again later.');
      
      const result = await response.json();
      setQuoteDetails(result.quoteDetails);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setQuoteDetails(null);
    setError(null);
    setFormData({ state: '', vehicleMake: '', vehicleModel: '', vehicleColor: '' });
  };

  if (loading) {
    return <QuoteSkeleton />;
  }

  if (quoteDetails) {
    return <QuoteResult quoteDetails={quoteDetails} onReset={handleReset} />;
  }

  return (
    <form className="detailed-quote-form" onSubmit={handleSubmit}>
      <h2>Hello, {user?.firstName || 'Guest'}!</h2>
      <p className="form-description">Let's get the details for your quote.</p>

      <Dropdown label="State" name="state" value={formData.state} onChange={handleChange} options={states} />
      <Dropdown label="Vehicle Make" name="vehicleMake" value={formData.vehicleMake} onChange={handleChange} options={vehicleMakes} />
      <Dropdown label="Vehicle Model" name="vehicleModel" value={formData.vehicleModel} onChange={handleChange} options={models} />
      <Dropdown label="Vehicle Color" name="vehicleColor" value={formData.vehicleColor} onChange={handleChange} options={vehicleColors} />

      <Button type="submit" variant="primary">Get My Quote</Button>

      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default DetailedQuoteForm;