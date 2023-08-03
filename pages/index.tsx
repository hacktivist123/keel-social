// pages/index.tsx

import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useAuth } from '../components/AuthContext';
import LoginForm from '../components/LoginForm';
import PostCard from '../components/PostCard';
import NewPostForm from '../components/NewPostForm';



const Home = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const authContext = useAuth();


  const handleLogout = () => {
    authContext.logout()
    // Redirect to the login page after logout
    window.location.href = '/'
    // Clear userPosts on logout
    setUserPosts(null)
  };


  useEffect(() => {
    if (authenticated) {
      // Fetch user's posts using the authentication token
      const fetchUserPosts = async () => {
        try {

          const response = await fetch(process.env.NEXT_PUBLIC_API_USER_POSTS_URL, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authContext.accessToken}`,
            },
          });

          if (!authContext.accessToken) {
            console.error('AccessToken is null.'); // check for debugging accessToken
            return;
          }
          if (response.ok) {
            const data = await response.json();
            await setUserPosts(data.results);
          } else {
            const data = await response.json();
            console.log(data.message)
          }
        } catch (error) {
          console.error(error)
        }
      };

      fetchUserPosts();
    }
  }, [authenticated, authContext.accessToken]);

  const handlePostCreated = (newPost) => {
    setUserPosts([newPost, ...userPosts]);
  };

  return (
    <Container>
      <ContentContainer>
      {authenticated ? (
        <>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
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

const LogoutButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 16px;
`;


export default Home;
