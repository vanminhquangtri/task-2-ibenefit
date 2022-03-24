import apiRequest from 'api/core';

const deviceAPI = {
  init: async (data = {}) => {
    return apiRequest('/device/init', 'POST', data);
  },
};

export default deviceAPI;
