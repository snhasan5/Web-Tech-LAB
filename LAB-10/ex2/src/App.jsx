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
  const [taskName, setTaskName] = useState('');
  const [tasks, setTasks] = useState([]);
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState(initialMessage);

  const validateTask = (value, currentTasks = tasks) => {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return 'Please enter a task name.';
    }

    if (trimmedValue.length < 2) {
      return 'Task names should be at least 2 characters long.';
    }

    if (
      currentTasks.some(
        (task) => task.title.toLowerCase() === trimmedValue.toLowerCase()
      )
    ) {
      return 'This task already exists.';
    }

    return '';
  };

  const handleChange = (event) => {
    const nextValue = event.target.value;
    setTaskName(nextValue);
    setError(validateTask(nextValue));
    setMessage(initialMessage);
  };

  const handleBlur = () => {
    setTouched(true);
    setError(validateTask(taskName));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextError = validateTask(taskName);
    setTouched(true);
    setError(nextError);

    if (nextError) {
      setMessage(initialMessage);
      return;
    }

    const newTask = {
      id: createId(),
      title: taskName.trim(),
    };

    setTasks((currentTasks) => [newTask, ...currentTasks]);
    setTaskName('');
    setTouched(false);
    setError('');
    setMessage({
      type: 'success',
      text: `"${newTask.title}" was added.`,
    });
  };

  const handleRemove = (id) => {
    setTasks((currentTasks) => {
      const taskToRemove = currentTasks.find((task) => task.id === id);
      const nextTasks = currentTasks.filter((task) => task.id !== id);

      if (taskToRemove) {
        setMessage({
          type: 'info',
          text: `Removed "${taskToRemove.title}".`,
        });
      }

      return nextTasks;
    });
  };

  return (
    <main className="app-shell">
      <section className="hero">
        <div>
          <p className="eyebrow">Task Board</p>
          <h1>Manage your list with instant add and remove actions.</h1>
          <p className="hero__text">
            This interface uses array state, controlled inputs, dynamic map rendering,
            and stable keys for efficient updates in React.
          </p>
        </div>

        <div className="stats-grid" aria-label="Task summary">
          <div className="stat-card">
            <span>Total tasks</span>
            <strong>{tasks.length}</strong>
          </div>
          <div className="stat-card">
            <span>Input mode</span>
            <strong>Controlled</strong>
          </div>
          <div className="stat-card">
            <span>Rendering</span>
            <strong>Dynamic</strong>
          </div>
        </div>
      </section>

      <section className="layout-grid">
        <ItemForm
          value={taskName}
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

          <ItemList items={tasks} onRemove={handleRemove} />
        </div>
      </section>
    </main>
  );
}

export default App;
