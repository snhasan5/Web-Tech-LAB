function FeedState({ variant, message, count, onRetry }) {
  if (variant === 'loading') {
    return (
      <div className="state-card state-card--loading" aria-live="polite">
        <div className="spinner" aria-hidden="true" />
        <div>
          <h3>Loading live data</h3>
          <p>The application is requesting the latest records from the API.</p>
        </div>
      </div>
    );
  }

  if (variant === 'error') {
    return (
      <div className="state-card state-card--error" role="alert">
        <div>
          <h3>Unable to fetch data</h3>
          <p>{message}</p>
        </div>
        <button type="button" className="secondary-button" onClick={onRetry}>
          Retry request
        </button>
      </div>
    );
  }

  return (
    <div className="state-card state-card--success">
      <div>
        <h3>Data loaded successfully</h3>
        <p>{count} records are ready for display.</p>
      </div>
    </div>
  );
}

export default FeedState;
