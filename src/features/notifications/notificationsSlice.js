import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../api/client";

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: [],
  reducers: {
    allNotificationsRead(state, action) {
      state.forEach(notification => {
        notification.read = true
      })
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.forEach(notification => {
        // 所有已读的 notification 不再是新 notification
        notification.isNew = !notification.read
      })
      state.push(...action.payload)
      state.sort((a, b) => b.date.localeCompare(a.date))
    })
  }
})

export const { allNotificationsRead } = notificationsSlice.actions

export const fetchNotifications = createAsyncThunk('notifications', async(_, { getState }) => {
  const allNotifications = selectAllNotifications(getState())
  // 数组解构：取数组中的第一项（最新的一个 Notification）
  const [latestNotification] = allNotifications
  const latestTimestamp = latestNotification ? latestNotification.date : ''
  const response = await client.get(`/fakeApi/notifications?since=${latestTimestamp}`)
  // 返回的是一个 Notification 数组
  return response.data
})

export default notificationsSlice.reducer

export const selectAllNotifications = state => state.notifications