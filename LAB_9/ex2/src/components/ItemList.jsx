function ItemList({ items, onRemove }) {
  if (!items.length) {
    return (
      <section className="panel empty-state" aria-live="polite">
        <p className="eyebrow">Current List</p>
        <h2>No items yet</h2>
        <p>
          Add your first item above. New entries appear here immediately, and each one
          can be removed with a single click.
        </p>
      </section>
    );
  }

  return (
    <section className="panel list-panel" aria-live="polite">
      <div className="panel__header">
        <div>
          <p className="eyebrow">Current List</p>
          <h2>Active items</h2>
        </div>
        <span className="pill pill--soft">{items.length} total</span>
      </div>

      <ul className="item-list">
        {items.map((item, index) => (
          <li className="item-card" key={item.id}>
            <div className="item-card__content">
              <span className="item-card__index">#{index + 1}</span>
              <div>
                <h3>{item.title}</h3>
                <p>Added just now as a controlled React state update.</p>
              </div>
            </div>

            <button
              className="ghost-button"
              type="button"
              onClick={() => onRemove(item.id)}
              aria-label={`Remove ${item.title}`}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ItemList;
