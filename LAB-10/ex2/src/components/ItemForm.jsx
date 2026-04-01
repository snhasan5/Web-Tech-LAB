function ItemForm({ value, error, touched, onChange, onBlur, onSubmit }) {
  return (
    <form className="panel form-panel" onSubmit={onSubmit} noValidate>
      <div className="panel__header">
        <div>
          <p className="eyebrow">Create Task</p>
          <h2>Add a new item</h2>
        </div>
        <span className="pill">Controlled input</span>
      </div>

      <label className={error && touched ? 'field field--invalid' : 'field'} htmlFor="taskName">
        <span className="field__label">Task name</span>
        <input
          id="taskName"
          name="taskName"
          type="text"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="e.g. Submit weekly report"
          aria-invalid={Boolean(error && touched)}
          aria-describedby={error && touched ? 'task-error' : undefined}
        />

        {error && touched ? (
          <span className="field__error" id="task-error">
            {error}
          </span>
        ) : (
          <span className="field__hint">Use a clear and unique label for each task.</span>
        )}
      </label>

      <button className="primary-button" type="submit">
        Add task
      </button>
    </form>
  );
}

export default ItemForm;
