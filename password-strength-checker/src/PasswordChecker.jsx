import { useState } from 'react';

function PasswordChecker() {
  const [password, setPassword] = useState('');
  const [result, setResult] = useState(null);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCheckPassword = async () => {
    const response = await fetch('http://localhost:5000/api/check-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });

    const data = await response.json();
    setResult(data);
  };

  // Inline styles
  const bodyStyle = {
    margin: 0,
    padding: 0,
    fontFamily: 'Arial, sans-serif',
    height: '100vh',  // Ensures body takes full height
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7fafc',  // Light background color
    overflow: 'hidden',  // Prevents overflow
    flexDirection: 'column', // Allow footer to stay at bottom
  };

  const htmlStyle = {
    height: '100%', // Ensures html element takes full height of the page
    margin: 0,  // Remove default margin on HTML
  };

  const cardStyle = {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '600px',  // Adjust max width to ensure the card doesn't get too wide
    textAlign: 'center',  // Centers text inside the card
    boxSizing: 'border-box', // Includes padding and border in width/height calculations
  };

  const headingStyle = {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#333',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#4CAF50',
    color: 'white',
    fontSize: '1rem',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: '#45a049', // Darker green on hover
  };

  const resultStyle = {
    marginTop: '20px',
  };

  const resultTextStyle = {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  return (
    <div style={bodyStyle}>
      <div style={cardStyle}>
        <h2 style={headingStyle}>Password Strength Checker</h2>
        <div>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
            Enter your password:
          </label>
          <input
            type="password"
            id="password"
            style={inputStyle}
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
          />
        </div>
        <button
          style={buttonStyle}
          onClick={handleCheckPassword}
          onMouseEnter={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
          onMouseLeave={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
        >
          Check Strength
        </button>

        {result && (
          <div style={resultStyle}>
            <h3 style={resultTextStyle}>Strength Level: {result.level}</h3>
            <p style={{ textAlign: 'center' }}>Score: {result.score}/5</p>
            <ul style={{ listStyleType: 'none', padding: '0' }}>
              {Object.entries(result.criteria).map(([key, value]) => (
                <li
                  key={key}
                  style={{
                    color: value ? 'green' : 'red',
                    fontWeight: 'normal',
                  }}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}: {value ? 'Yes' : 'No'}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer style={{
        marginTop: '40px',
        padding: '10px',
        textAlign: 'center',
        backgroundColor: '#f7fafc',
        width: '100%',
      }}>
        <p style={{ fontSize: '1rem', color: '#333' }}>
          Made by Eliud Simon
        </p>
      </footer>
    </div>
  );
}

export default PasswordChecker;
