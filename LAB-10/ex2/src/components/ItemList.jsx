function ItemList({ items, onRemove }) {
  if (!items.length) {
    return (
      <section className="panel empty-state" aria-live="polite">
        <p className="eyebrow">Current Tasks</p>
        <h2>No tasks yet</h2>
        <p>Add your first task above. Each entry appears immediately and can be removed in one click.</p>
      </section>
    );
  }

  return (
    <section className="panel list-panel" aria-live="polite">
      <div className="panel__header">
        <div>
          <p className="eyebrow">Current Tasks</p>
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
                <p>Rendered from array state with a stable React key.</p>
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
