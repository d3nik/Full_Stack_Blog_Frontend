import { createSlice } from '@reduxjs/toolkit';
import { TagsBlock } from '../../components';

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  TagsBlock: {
    items: [],
    status: "loading",
  }, 
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
    reducers: {
    // setPosts(state, action) {
    //   state.posts.items = action.payload;
    //   state.posts.status = "loaded";
    // },
    // setTags(state, action) {
    //   state.TagsBlock.items = action.payload;
    //   state.TagsBlock.status = "loaded";
    // },
    // setPostsLoading(state) {
    //   state.posts.items = [];
    //   state.posts.status = "loading";
    // },
    // setTagsLoading(state) {
    //   state.TagsBlock.items = [];
    //   state.TagsBlock.status = "loading";
    // },
  },
}); 

export const postsReducer = postsSlice.reducer;