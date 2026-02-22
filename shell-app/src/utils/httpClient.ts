import axios from 'axios';
// Tạo một instance của axios
const httpClient = axios.create({
  // baseURL: appConfig.consoleApiUrl, // Thay bằng URL API của bạn
  timeout: 10000, // Thời gian chờ tối đa (10 giây)
  headers: {
    'Content-Type': 'application/json',
  },
});

const httpClientWithAuth = httpClient.create({
  withCredentials: true, // Cho phép gửi cookie nếu cần
});

httpClientWithAuth.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
    }
    return null;
  }
);
export { httpClient, httpClientWithAuth };
