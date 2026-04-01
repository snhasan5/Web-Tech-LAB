import { useEffect, useState } from 'react';
import FeedList from './components/FeedList';
import FeedState from './components/FeedState';

const API_URL = 'https://jsonplaceholder.typicode.com/posts?_limit=6';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');

  const loadPosts = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      setPosts(data);
      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'Unable to load data from the server.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadPosts();
  }, []);

  return (
    <main className="app-shell">
      <section className="hero panel">
        <div className="hero__copy">
          <p className="eyebrow">API Snapshot</p>
          <h1>Live data fetched directly from an external API.</h1>
          <p className="hero__text">
            This interface demonstrates asynchronous fetching with useEffect, state-driven
            rendering, and a polished loading and error experience.
          </p>
        </div>

        <div className="stats-grid" aria-label="Feed summary">
          <div className="stat-card">
            <span>Records</span>
            <strong>{posts.length}</strong>
          </div>
          <div className="stat-card">
            <span>Status</span>
            <strong>{loading ? 'Loading' : error ? 'Error' : 'Ready'}</strong>
          </div>
          <div className="stat-card">
            <span>Updated</span>
            <strong>{lastUpdated || '—'}</strong>
          </div>
        </div>
      </section>

      <section className="layout-grid">
        <aside className="panel panel--sticky">
          <div className="panel__header">
            <div>
              <h2>Connection state</h2>
              <p className="panel__subtext">
                The request runs once when the component mounts, then the UI reacts to the
                result.
              </p>
            </div>
            <span className={`pill ${loading ? 'pill--soft' : error ? 'pill--danger' : ''}`}>
              {loading ? 'Fetching' : error ? 'Attention' : 'Stable'}
            </span>
          </div>

          {loading ? <FeedState variant="loading" /> : null}
          {!loading && error ? <FeedState variant="error" message={error} onRetry={loadPosts} /> : null}
          {!loading && !error ? <FeedState variant="success" count={posts.length} /> : null}
        </aside>

        <section className="panel">
          <div className="panel__header">
            <div>
              <h2>Latest items</h2>
              <p className="panel__subtext">
                Each row is rendered from state with a stable key for efficient reconciliation.
              </p>
            </div>
          </div>

          {!loading && !error && posts.length === 0 ? (
            <div className="empty-state">
              <h3>No items available</h3>
              <p>The API returned an empty response for this request.</p>
            </div>
          ) : null}

          {!loading && !error && posts.length > 0 ? <FeedList items={posts} /> : null}
        </section>
      </section>
    </main>
  );
}

export default App;
