import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

const fetchPostsAPI = async (sortBy = 'createdAt', order = 'desc') => {
  const url = `/posts?sortBy=${sortBy}&order=${order}`;
  const { data } = await axios.get(url);
  return data;
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts', 
  async (params = {}) => {
    const { sortBy = 'createdAt', order = 'desc' } = params;
    return fetchPostsAPI(sortBy, order);
  }
);

// export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (params = {}) => {
//   const sortBy = params.sortBy || 'createdAt';
//   const order = params.order || 'desc';
//   const timeStamp = new Date().getTime();
//   const { data } = await axios.get(`/posts?sortby=${sortBy}&order=${order}&t=${timeStamp}`);
//   return data;
// });

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  const { data } = await axios.get('/tags');
  return data;
});

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) => {
  await axios.delete(`/posts/${id}`);
});

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
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
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
    [fetchTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = "loading";
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "loaded";
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = "error";
    },
    [fetchRemovePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter(
        (obj) => obj._id !== action.meta.arg
      );
    },
  }
}); 

export const postsReducer = postsSlice.reducer; 