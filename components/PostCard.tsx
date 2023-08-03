import styled from 'styled-components';

interface PostCardProps {
  post: {
    id: number;
    title: string;
    createdAt: string;
  };
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Card key={post.id} className="post-card">
        <Content>{post.title}</Content>
        <CreatedAt>
        {new Date(post.createdAt).toLocaleString('en-US', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              hour12: true
            })}
       </CreatedAt>
    </Card>
  );
};

const Card = styled.div`
  background-color: white;
  padding: 15px;
  margin: 10px 0;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Content = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
`;

const CreatedAt = styled.p`
  font-size: 12px;
  color: #888;
`;

export default PostCard;
