import apiConfigs from 'config/api';
import axios from 'axios';
import { store } from 'store';
import { ErrorNotiModal, SuccessNotiModal } from 'utils/modal';
axios.defaults.timeout = 10000;

const apiRequest = async (
  url = '',
  method = 'GET',
  data = {},
  options = {}
) => {
  const { useHeaderDeviceCode, useModal, specialUrl, useToken } = options;
  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
  };

  if (useHeaderDeviceCode) {
    headers['DEVICE-CODE'] = store?.getState()?.Device?.data?.device_code;
  }
  if (useToken) {
    headers['Authorization'] = store?.getState()?.User?.token;
  }
  if (data instanceof FormData) {
    headers['Content-Type'] = 'multipart/form-data';
  }

  const configs = {
    url: apiConfigs.HOST + url,
    method,
    data,
    params: {},
    headers,
  };
  if (specialUrl) {
    configs.url = specialUrl;
  }
  if (method === 'get' || method === 'GET') {
    configs.params = data;
  }

  return axios(configs)
    .then((response) => {
      const data = response?.data;
      if (useModal) {
        if (data?.success) {
          SuccessNotiModal({ html: data?.msg || 'Thành công' });
        } else {
          ErrorNotiModal({ html: data?.msg || 'Không thành công' });
        }
      }
      return data;
    })
    .catch((error) => {
      const data = error?.response?.data;
      if (error?.code === 'ECONNABORTED') {
        ErrorNotiModal({ html: 'Không thể gửi yêu cầu, vui lòng thử lại sau' });
      }
      return data;
    });
};

export default apiRequest;
