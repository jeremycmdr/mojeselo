const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000/api' 
  : 'https://mojeselo-api.onrender.com/api';

export default API_URL;
