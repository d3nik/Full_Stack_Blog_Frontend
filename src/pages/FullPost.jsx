import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../axios';

import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';

export const FullPost = () => {
  const navigate = useNavigate();
  const [data, setData] = React.useState();
  const [comments, setComments] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const { id } = useParams();

  const handleRemovePost = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await axios.delete(`/posts/${data._id}`);
      navigate('/');
    }
  };

  const fetchPost = async () => {
    axios
      .get(`/posts/${id}`)
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.warn(err);
        alert('Помилка при отриманні статті');
      });
  };

  const fetchComments = async () => {
    axios
      .get(`/posts/${id}/comments`)
      .then(res =>{
        console.log('Comments fetched:', res.data);
        setComments(res.data)})
      .catch(err => {
        console.warn(err);
        alert('Помилка при отриманні коментарів');
      });
  };

  React.useEffect(() => {
    fetchPost();
    fetchComments();
  }, []);

  // React.useEffect(() => {
  //   axios
  //     .get(`/posts/${id}`)
  //     .then(res => {
  //       setData(res.data);
  //       setLoading(false);
  //     })
  //     .catch(err => {
  //       console.warn(err);
  //       alert('Помилка при отриманні статті');
  //     });
  // }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost/>;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4021${data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={data.commentsCount}
        tags={data.tags}
        isFullPost
        onRemove={handleRemovePost}
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock
        items={ comments.map(comment => ({
          _id: comment._id,
          user: {
            _id: comment.user._id,
            fullName: comment.user.fullName,
            avatarUrl: comment.user.avatarUrl,
          },
          text: comment.text,
        })) }
        isLoading={false}
        onCommentDeleted={fetchComments}
      >
        <Index  onCommentSubmit={fetchComments}/>
      </CommentsBlock>
    </>
  );
};