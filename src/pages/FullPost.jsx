import React from 'react';

import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';

export const FullPost = () => {
  return (
    <>
      <Post
        id={1}
        title="Roast the code #1 | Rock Paper Scissors"
        imageUrl="https://img.freepik.com/free-photo/programming-background-with-person-working-with-codes-computer_23-2150010125.jpg?semt=ais_hybrid&w=740&q=80  "
        user={{
          avatarUrl:
            "https://images.pexels.com/photos/66863/goose-water-bird-nature-bird-66863.jpeg?cs=srgb&dl=pexels-pixabay-66863.jpg&fm=jpg",
          fullName: "d3_nik",
        }}
        createdAt={"12 жовтня 2025 р."}
        viewsCount={150}
        commentsCount={3}
        tags={["react", "fun", "typescript"]}
        isFullPost
      >
        <p>
          Hey there! 👋 I'm starting a new series called "Roast the Code", where
          I will share some code, and let YOU roast and improve it. There's not
          much more to it, just be polite and constructive, this is an exercise
          so we can all learn together. Now then, head over to the repo and
          roast as hard as you can!!
        </p>
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Коля Ніколюк",
              avatarUrl: "https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
            text: "Це тестовий коментар 555555",
          },
          {
            user: {
              fullName: "Іван Іванов",
              avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1hbnxlbnwwfHwwfHx8MA%3D%3D",
            },

            // "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top"
            text: "Це тестовий коментар 2",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
