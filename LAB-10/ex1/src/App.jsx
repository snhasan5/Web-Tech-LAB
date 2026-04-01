import { useState } from 'react';

const initialFormData = {
  name: '',
  email: '',
  password: '',
};

const initialTouched = {
  name: false,
  email: false,
  password: false,
};

function validateForm(values) {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!values.name.trim()) {
    errors.name = 'Name is required.';
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!emailRegex.test(values.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!values.password) {
    errors.password = 'Password is required.';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters long.';
  }

  return errors;
}

export default function App() {
  const [formData, setFormData] = useState(initialFormData);
  const [touched, setTouched] = useState(initialTouched);
  const [submitMessage, setSubmitMessage] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const errors = validateForm(formData);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSubmitMessage('');
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setHasSubmitted(true);

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setTouched({
        name: true,
        email: true,
        password: true,
      });
      setSubmitMessage('Please fix the highlighted errors before submitting.');
      return;
    }

    setSubmitMessage('Form submitted successfully.');
    setFormData(initialFormData);
    setTouched(initialTouched);
    setHasSubmitted(false);
  };

  const showError = (field) => touched[field] || hasSubmitted;

  return (
    <main className="page">
      <section className="form-card">
        <div className="heading">
          <p className="tag">Account Setup</p>
          <h1>Create your profile</h1>
          <p className="subtitle">Provide your details to complete registration.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="field-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your full name"
              aria-invalid={showError('name') && Boolean(errors.name)}
            />
            {showError('name') && errors.name ? (
              <p className="error-text">{errors.name}</p>
            ) : null}
          </div>

          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="name@example.com"
              aria-invalid={showError('email') && Boolean(errors.email)}
            />
            {showError('email') && errors.email ? (
              <p className="error-text">{errors.email}</p>
            ) : null}
          </div>

          <div className="field-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Use at least 8 characters"
              aria-invalid={showError('password') && Boolean(errors.password)}
            />
            {showError('password') && errors.password ? (
              <p className="error-text">{errors.password}</p>
            ) : null}
          </div>

          <button type="submit" className="submit-button">
            Submit
          </button>

          {submitMessage ? (
            <p
              className={
                submitMessage.includes('successfully')
                  ? 'feedback feedback--success'
                  : 'feedback feedback--error'
              }
              role="status"
            >
              {submitMessage}
            </p>
          ) : null}
        </form>
      </section>
    </main>
  );
}