import apiRequest from 'api/core';

const userAPI = {
  login: async (data = {}) => {
    return apiRequest('/auth/login', 'POST', data, {
      useHeaderDeviceCode: true,
      useModal: true,
    });
  },
  logout: async (data = {}) => {
    return apiRequest('/auth/logout', 'GET', data, {
      useHeaderDeviceCode: true,
      useModal: true,
    });
  },
  update: async (data = {}) => {
    return apiRequest('/auth/profile/update', 'PUT', data, {
      useHeaderDeviceCode: true,
      useModal: true,
      useToken: true,
    });
  },
};

export default userAPI;
