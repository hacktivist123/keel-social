// components/NewPostForm.tsx

import { useState } from 'react';
import styled, {keyframes} from 'styled-components';

import { useAuth } from './AuthContext';

interface NewPostFormProps {
  onPostCreated: (newPost: any) => void;
}

const NewPostForm: React.FC<NewPostFormProps> = ({ onPostCreated }) => {
  const authContext = useAuth();
  const [content, setContent] = useState('');
  const [error, setError] = useState('');


  const handleCreatePost = async () => {
    try {
      // Make API request to create a new post
      const response = await fetch(process.env.NEXT_PUBLIC_API_CREATE_POST_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authContext.accessToken}`,
        },
        body: JSON.stringify({
          title: content,
        }),
      });

      if (response.ok) {
        const newPost = await response.json();
        onPostCreated(newPost);
        setContent('');
        console.log('Post created successfully');
      } else {
        const data = await response.json();
        setError(data.message || 'An error occurred while creating the post.');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred while creating the post.');
    }
  };

  return (
    <FormContainer className="new-post-form">
        {error && <ErrorText>{error}</ErrorText>}
      <TextArea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button onClick={handleCreatePost}>Create Post</Button>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
`;

const slideIn = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const ErrorText = styled.p`
  color: red;
  margin: 5px 0;
  animation: ${slideIn} 0.5s ease-in-out;
`;

export default NewPostForm;
