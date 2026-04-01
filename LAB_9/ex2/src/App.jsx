import { useState } from 'react';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';

const initialMessage = {
  type: 'idle',
  text: '',
};

function createId() {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function App() {
  const [itemName, setItemName] = useState('');
  const [items, setItems] = useState([]);
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState(initialMessage);

  const validateItem = (value, currentItems = items) => {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return 'Please enter an item name.';
    }

    if (trimmedValue.length < 2) {
      return 'Item names should be at least 2 characters long.';
    }

    if (
      currentItems.some(
        (item) => item.title.toLowerCase() === trimmedValue.toLowerCase()
      )
    ) {
      return 'This item already exists in the list.';
    }

    return '';
  };

  const handleChange = (event) => {
    const nextValue = event.target.value;
    setItemName(nextValue);
    setError(validateItem(nextValue));
    setMessage(initialMessage);
  };

  const handleBlur = () => {
    setTouched(true);
    setError(validateItem(itemName));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextError = validateItem(itemName);
    setTouched(true);
    setError(nextError);

    if (nextError) {
      setMessage(initialMessage);
      return;
    }

    const newItem = {
      id: createId(),
      title: itemName.trim(),
    };

    setItems((currentItems) => [newItem, ...currentItems]);
    setItemName('');
    setTouched(false);
    setError('');
    setMessage({
      type: 'success',
      text: `"${newItem.title}" has been added to the list.`,
    });
  };

  const handleRemove = (id) => {
    setItems((currentItems) => {
      const itemToRemove = currentItems.find((item) => item.id === id);
      const nextItems = currentItems.filter((item) => item.id !== id);

      if (itemToRemove) {
        setMessage({
          type: 'info',
          text: `Removed "${itemToRemove.title}" from the list.`,
        });
      }

      return nextItems;
    });
  };

  return (
    <main className="app-shell">
      <section className="hero">
        <div>
          <p className="eyebrow">React List Manager</p>
          <h1>Controlled list handling with instant add and remove actions.</h1>
          <p className="hero__text">
            This interface demonstrates a controlled input, array state, dynamic list
            rendering, unique keys, and clean empty-state behavior in React.
          </p>
        </div>

        <div className="stats-grid" aria-label="List summary">
          <div className="stat-card">
            <span>Items</span>
            <strong>{items.length}</strong>
          </div>
          <div className="stat-card">
            <span>Validation</span>
            <strong>Live</strong>
          </div>
          <div className="stat-card">
            <span>Removal</span>
            <strong>Instant</strong>
          </div>
        </div>
      </section>

      <section className="layout-grid">
        <ItemForm
          value={itemName}
          error={error}
          touched={touched}
          onChange={handleChange}
          onBlur={handleBlur}
          onSubmit={handleSubmit}
        />

        <div className="stack">
          {message.type !== 'idle' ? (
            <div className={`message message--${message.type}`} role="status">
              {message.text}
            </div>
          ) : null}

          <ItemList items={items} onRemove={handleRemove} />
        </div>
      </section>
    </main>
  );
}

export default App;
