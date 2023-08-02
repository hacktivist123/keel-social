// components/NewPostForm.tsx

import { useState } from 'react';

import styled from 'styled-components';

interface NewPostFormProps {
  onPostCreated: (newPost: any) => void;
  token: string
}

const NewPostForm: React.FC<NewPostFormProps> = ({ onPostCreated,token }) => {
  const [content, setContent] = useState('');

  const handleCreatePost = async () => {
    try {
      // Make API request to create a new post
      const response = await fetch('API_CREATE_POST_URL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ content }),
      });

      if (response.ok) {
        const newPost = await response.json();
        onPostCreated(newPost);
        setContent('');
      } else {
        return <div>API error</div>
      }
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <FormContainer className="new-post-form">
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

export default NewPostForm;
