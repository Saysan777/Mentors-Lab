import { createAsyncThunk } from '@reduxjs/toolkit';
import config from 'config';
import { MentorshipRequestStatus } from 'enums';
import { MentorshipRequest, MentorshipRequestData, MentorshipResponseData } from 'types';
import http from 'utils/http';

export const sendMentorshipRequest = createAsyncThunk(
  'mentorship/sendMentorshipRequest',
  async ({ values, mentorId }: { values: MentorshipRequestData; mentorId: string }, thunkAPI) => {
    try {
      const url = `${config.endpoints.mentorship.sendMentorshipRequest}/${mentorId}`;
      const {
        data: { ok },
      } = await http.post<{ ok: boolean }>(url, values);
      return ok;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

export const fetchMentorshipRequestsByStudent = createAsyncThunk(
  'mentorship/fetchMentorshipRequestsByStudent',
  async (_, thunkAPI) => {
    try {
      const url = config.endpoints.mentorship.fetchMentorshipRequestsByStudent;
      const { data } = await http.get<MentorshipRequest[]>(url);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

export const fetchMentorshipRequestByStudent = createAsyncThunk(
  'mentorship/fetchMentorshipRequestByStudent',
  async (id: string, thunkAPI) => {
    try {
      const url = `${config.endpoints.mentorship.fetchMentorshipRequestByStudent}/${id}`;
      const { data } = await http.get<MentorshipRequest>(url);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

export const fetchMentorshipRequestsOfMentor = createAsyncThunk(
  'mentorship/fetchMentorshipRequestsOfMentor',
  async (_, thunkAPI) => {
    try {
      const url = config.endpoints.mentorship.fetchMentorshipRequestsOfMentor;
      const { data } = await http.get<MentorshipRequest[]>(url);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

export const fetchMentorshipRequestOfMentor = createAsyncThunk(
  'mentorship/fetchMentorshipRequestOfMentor',
  async (id: string, thunkAPI) => {
    try {
      const url = `${config.endpoints.mentorship.fetchMentorshipRequestOfMentor}/${id}`;
      const { data } = await http.get<MentorshipRequest>(url);
      return data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

export const updateMentorshipRequestStatus = createAsyncThunk(
  'mentorship/updateMentorshipRequestStatus',
  async ({ id, status }: { id: string; status: MentorshipRequestStatus }, thunkAPI) => {
    try {
      const url = `${config.endpoints.mentorship.updateMentorshipRequestStatus}/${id}`;
      const { data } = await http.put<MentorshipRequest>(url, { status });
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

export const createMentorshipResponse = createAsyncThunk(
  'mentorship/createMentorshipResponse',
  async ({ id, response }: { id: string; response: MentorshipResponseData }, thunkAPI) => {
    try {
      const url = `${config.endpoints.mentorship.createMentorshipResponse}/${id}`;
      const { data } = await http.post<MentorshipResponseData>(url, response);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);
