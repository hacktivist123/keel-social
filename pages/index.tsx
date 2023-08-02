// pages/index.tsx

import { useEffect, useState } from 'react';
import LoginForm from '../components/LoginForm';
import PostCard from '../components/PostCard';
import NewPostForm from '../components/NewPostForm';

const Home = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (authenticated) {
      // Fetch user's posts using the authentication token
      const fetchUserPosts = async () => {
        try {
          const response = await fetch(process.env.NEXT_PUBLIC_API_USER_POSTS_URL);

          if (response.ok) {
            const data = await response.json();
            setUserPosts(data.results);
          } else {
            return <div>API error</div>
          }
        } catch (error) {
          console.error(error)
        }
      };

      fetchUserPosts();
    }
  }, [authenticated]);

  const handlePostCreated = (newPost) => {
    setUserPosts([newPost, ...userPosts]);
  };

  return (
    <div>
      {authenticated ? (
        <>
          <h1>Welcome to Keel Social</h1>
          <NewPostForm onPostCreated={handlePostCreated} />
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
