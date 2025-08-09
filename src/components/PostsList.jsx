const PostsList = ({ posts }) => {
  return (
    <div className="posts-list">
      <h3>Last 3 Posts</h3>
      {posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      ) : (
        <p>No posts found</p>
      )}
    </div>
  );
};

export default PostsList;