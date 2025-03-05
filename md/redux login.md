Dưới đây là một ví dụ hoàn chỉnh tích hợp một slice quản lý trạng thái đăng nhập người dùng sử dụng Redux Toolkit với tác vụ bất đồng bộ gọi API tại `/api/v1/auth/login` và một trang Login:

---

### 1. Tạo Auth Slice với Async Thunk

File: **src/features/auth/authSlice.js**

```javascript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk gọi API đăng nhập
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, thunkAPI) => {
    try {
      const response = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      if (!response.ok) {
        const errorData = await response.json();
        // Trả về lỗi từ API nếu có
        return thunkAPI.rejectWithValue(errorData.message);
      }
      const data = await response.json();
      // Giả sử API trả về dạng { user: { ... }, role: 'user' | 'admin' }
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  loggedIn: false,
  user: null,
  role: 'guest', // 'guest', 'user', 'admin', v.v.
  status: 'idle', // idle | loading | succeeded | failed
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.loggedIn = false;
      state.user = null;
      state.role = 'guest';
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loggedIn = true;
        state.user = action.payload.user;
        state.role = action.payload.role;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
```

---

### 2. Cấu hình Store

File: **src/app/store.js**

```javascript
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    // Các slice khác nếu có...
  }
});

export default store;
```

---

### 3. Tạo Login Page

File: **src/features/auth/LoginPage.jsx**

```jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './authSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const { status, error, loggedIn, role } = useSelector(state => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  if (loggedIn) {
    return (
      <div>
        <h2>Chào mừng!</h2>
        <p>Bạn đã đăng nhập thành công với vai trò: <strong>{role}</strong></p>
        {/* Ở đây bạn có thể điều hướng sang trang dashboard tương ứng */}
      </div>
    );
  }

  return (
    <div>
      <h2>Đăng nhập</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>
        <div>
          <label>Mật khẩu:</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>
        <button type="submit">
          {status === 'loading' ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
      </form>
      {status === 'failed' && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LoginPage;
```

---

### 4. Kết nối Store với Ứng dụng

File: **src/index.js**

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import LoginPage from './features/auth/LoginPage';

ReactDOM.render(
  <Provider store={store}>
    <LoginPage />
  </Provider>,
  document.getElementById('root')
);
```

---

### Giải thích:

1. **authSlice.js:**  
   - Sử dụng `createAsyncThunk` để tạo async thunk `loginUser` nhằm gửi POST request đến `/api/v1/auth/login` với thông tin đăng nhập (email và password).
   - Trong `extraReducers`, trạng thái của quá trình đăng nhập được cập nhật (pending, fulfilled, rejected).
   - Nếu đăng nhập thành công, state sẽ được cập nhật với thông tin người dùng và role từ API.

2. **store.js:**  
   - Store được cấu hình với reducer của authSlice.

3. **LoginPage.jsx:**  
   - Component sử dụng state của auth để hiển thị giao diện đăng nhập, thông báo loading hoặc lỗi.
   - Sau khi đăng nhập thành công, giao diện sẽ hiển thị lời chào kèm role của người dùng.

4. **index.js:**  
   - Kết nối store với ứng dụng bằng Provider.

Với cách cấu hình này, bạn có thể dễ dàng mở rộng để hiển thị các giao diện khác nhau dựa trên role của người dùng (ví dụ: giao diện quản trị viên, người dùng thông thường, khách) và xử lý trạng thái đăng nhập một cách nhất quán thông qua Redux Toolkit.