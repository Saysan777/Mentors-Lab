import { createAsyncThunk } from '@reduxjs/toolkit';
import config from 'config';
import { User } from 'types';
import http from 'utils/http';

export const fetchMentors = createAsyncThunk('users/fetchMentors', async (_, thunkAPI) => {
  try {
    const url = config.endpoints.users.fetchMentors;
    const { data } = await http.get<User[]>(url);
    return data;
  } catch (err) {
    thunkAPI.rejectWithValue(err.response.data.message);
  }
});

export const fetchRecommendedMentors = createAsyncThunk('users/fetchRecommendedMentors', async (_, thunkAPI) => {
  try {
    const url = config.endpoints.users.fetchRecommendedMentors;
    const { data } = await http.get<User[]>(url);
    return data;
  } catch (err) {
    thunkAPI.rejectWithValue(err.response.data.message);
  }
});
