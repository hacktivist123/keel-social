// pages/index.tsx

import { useEffect, useState } from 'react';
import LoginForm from '../components/LoginForm';
import PostCard from '../components/PostCard';
import NewPostForm from '../components/NewPostForm';

const Home = (token: string) => {
  const [userPosts, setUserPosts] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (authenticated) {
      // Fetch user's posts using the authentication token
      const fetchUserPosts = async () => {
        try {
          const response = await fetch('API_USER_POSTS_URL', {
            headers: {
              Authorization: `Bearer ${token}`, // Replace with your authentication token
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUserPosts(data.title);
          } else {
            return <div>API error</div>
          }
        } catch (error) {
          console.error(error)
        }
      };

      fetchUserPosts();
    }
  }, [authenticated, token]);

  const handlePostCreated = (newPost) => {
    setUserPosts([newPost, ...userPosts]);
  };

  return (
    <div>
      {authenticated ? (
        <>
          <h1>Welcome to Your Social Media App</h1>
          <NewPostForm token={token} onPostCreated={handlePostCreated} />
          <div>
            {userPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </>
      ) : (
        <LoginForm setAuthenticated={setAuthenticated} />
      )}
    </div>
  );
};

export default Home;
