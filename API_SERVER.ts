const server = 'http://10.16.110.52:3001';
// const server = 'http://54.64.122.67:3000';
const server_test = 'http://localhost:3000';
const API_SERVER = window.location.hostname === 'localhost'
  ? server_test
  : server

export default API_SERVER;