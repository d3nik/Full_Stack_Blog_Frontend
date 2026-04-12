import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import axios from '../axios';

import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';

export const FullPost = () => {
  const [data, setData] = React.useState();
  const [comments, setComments] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const { id } = useParams();

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
        isFullPost>
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock
        items={ comments.map(comment => ({
          user: {
            fullName: comment.user.fullName,
            avatarUrl: comment.user.avatarUrl,
          },
          text: comment.text,
        })) }
        isLoading={false}
      >
        <Index  onCommentSubmit={fetchComments}/>
      </CommentsBlock>
    </>
  );
};

// [
//           {
//             user: {
//               fullName: "Коля Ніколюк",
//               avatarUrl: "https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//             },
//             text: "Це тестовий коментар 555555",
//           },
//           {
//             user: {
//               fullName: "Іван Іванов",
//               avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1hbnxlbnwwfHwwfHx8MA%3D%3D",
//             },

//             // "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top"
//             text: "Це тестовий коментар 2",
//           },
//         ]