function ItemForm({ value, error, touched, onChange, onBlur, onSubmit }) {
  return (
    <form className="panel form-panel" onSubmit={onSubmit} noValidate>
      <div className="panel__header">
        <div>
          <p className="eyebrow">Add Item</p>
          <h2>Build your list in real time</h2>
        </div>
        <span className="pill">Controlled input</span>
      </div>

      <label className={error && touched ? 'field field--invalid' : 'field'} htmlFor="itemName">
        <span className="field__label">Item name</span>
        <input
          id="itemName"
          name="itemName"
          type="text"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="e.g. Finish project documentation"
          aria-invalid={Boolean(error && touched)}
          aria-describedby={error && touched ? 'item-error' : undefined}
        />
        {error && touched ? (
          <span className="field__error" id="item-error">
            {error}
          </span>
        ) : (
          <span className="field__hint">Use a clear, unique name for each entry.</span>
        )}
      </label>

      <button className="primary-button" type="submit">
        Add item
      </button>
    </form>
  );
}

export default ItemForm;
