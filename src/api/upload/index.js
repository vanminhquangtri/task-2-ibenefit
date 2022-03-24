import apiRequest from 'api/core';

const uploadAPI = {
  uploadImage: async (data = {}) => {
    return apiRequest('', 'POST', data, {
      specialUrl: 'http://filer.vipn.net/file/',
      useModal: true,
    });
  },
};

export default uploadAPI;
