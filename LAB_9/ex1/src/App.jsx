import { useState } from 'react';

const initialFormData = {
  name: '',
  email: '',
  password: '',
};

const initialErrors = {
  name: '',
  email: '',
  password: '',
};

const initialTouched = {
  name: false,
  email: false,
  password: false,
};

function App() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialErrors);
  const [touched, setTouched] = useState(initialTouched);
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = (data = formData) => {
    const nextErrors = { ...initialErrors };
    const trimmedName = data.name.trim();
    const trimmedEmail = data.email.trim();
    const password = data.password;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedName) {
      nextErrors.name = 'Please enter your full name.';
    }

    if (!trimmedEmail) {
      nextErrors.email = 'Email address is required.';
    } else if (!emailPattern.test(trimmedEmail)) {
      nextErrors.email = 'Enter a valid email format, like name@example.com.';
    }

    if (!password) {
      nextErrors.password = 'Create a password to continue.';
    } else if (password.length < 8) {
      nextErrors.password = 'Password should be at least 8 characters long.';
    }

    return nextErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextFormData = {
      ...formData,
      [name]: value,
    };

    setFormData(nextFormData);

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: validateForm(nextFormData)[name],
    }));

    setSuccessMessage('');
  };

  const handleBlur = (event) => {
    const { name } = event.target;

    setTouched((currentTouched) => ({
      ...currentTouched,
      [name]: true,
    }));

    setErrors(validateForm());
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextTouched = {
      name: true,
      email: true,
      password: true,
    };
    const nextErrors = validateForm();
    const hasErrors = Object.values(nextErrors).some(Boolean);

    setTouched(nextTouched);
    setErrors(nextErrors);

    if (hasErrors) {
      setSuccessMessage('');
      return;
    }

    setSuccessMessage(
      `Profile created successfully for ${formData.name.trim()}. Your information has been saved.`
    );
    setFormData(initialFormData);
    setErrors(initialErrors);
    setTouched(initialTouched);
  };

  const getFieldClassName = (field) => {
    if (touched[field] && errors[field]) {
      return 'field field--invalid';
    }

    if (touched[field] && !errors[field] && formData[field]) {
      return 'field field--valid';
    }

    return 'field';
  };

  return (
    <main className="page-shell">
      <section className="card">
        <div className="card__intro">
          <p className="eyebrow">Account Setup</p>
          <h1>Controlled React form with live validation</h1>
          <p className="lead">
            Capture user details with controlled inputs, validate each field in real time,
            and show a clear confirmation after submission.
          </p>
        </div>

        <div className="status-row" aria-live="polite">
          <div className="status-chip status-chip--solid">Controlled inputs</div>
          <div className="status-chip">Realtime validation</div>
          <div className="status-chip">Submission feedback</div>
        </div>

        <form className="form" onSubmit={handleSubmit} noValidate>
          <div className={getFieldClassName('name')}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Jane Doe"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name ? (
              <p className="error" id="name-error">
                {errors.name}
              </p>
            ) : null}
          </div>

          <div className={getFieldClassName('email')}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="jane@example.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email ? (
              <p className="error" id="email-error">
                {errors.email}
              </p>
            ) : null}
          </div>

          <div className={getFieldClassName('password')}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Minimum 8 characters"
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? 'password-error' : undefined}
            />
            {errors.password ? (
              <p className="error" id="password-error">
                {errors.password}
              </p>
            ) : null}
          </div>

          <button type="submit" className="submit-button">
            Create Account
          </button>
        </form>

        {successMessage ? (
          <div className="success" role="status">
            <strong>Submission successful.</strong>
            <span>{successMessage}</span>
          </div>
        ) : (
          <p className="helper-text">All fields are validated before the form is submitted.</p>
        )}
      </section>
    </main>
  );
}

export default App;
