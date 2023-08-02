// pages/index.tsx

import { useEffect, useState } from 'react';
import styled from 'styled-components';


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
    <Container>
      <ContentContainer>
      {authenticated ? (
        <>
          <Title>Welcome to Keel Social</Title>
          <NewPostForm onPostCreated={handlePostCreated} />
          <br/>
          <Card>
            {userPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </Card>
        </>
      ) : (
        <LoginForm setAuthenticated={setAuthenticated} />
      )}
      </ContentContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  background-color: #f5f8fa;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  margin: 20px;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  display: flex;
  font-size: 2rem;
  margin-bottom: 20px;
  align-items: center;
  justify-content: center;
`;

export default Home;
