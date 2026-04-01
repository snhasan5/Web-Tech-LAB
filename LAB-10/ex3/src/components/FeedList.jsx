function FeedList({ items }) {
  return (
    <ul className="feed-list">
      {items.map((item) => (
        <li className="feed-card" key={item.id}>
          <div className="feed-card__meta">
            <span className="feed-card__badge">Post #{item.id}</span>
            <span className="feed-card__author">User {item.userId}</span>
          </div>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </li>
      ))}
    </ul>
  );
}

export default FeedList;
