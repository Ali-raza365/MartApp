import {tokenStorage} from '@state/storage';
import {BASE_URL} from './config';
import axios from 'axios';
import useAuthStore from '@state/authStore';
import {preparNavigation, resetAndNavigate} from '@utils/NavigationUtils';
import {appAxios} from './apiInterceptors';
// import {appAxios} from './apiInterceptors';

export const customerLogin = async (phone: string) => {
  try {
    console.log(phone);
    const resp = await axios.post(`${BASE_URL}/customer/login`, {phone});
    const {accessToken, refreshToken, customer} = resp.data;
    console.log({accessToken, refreshToken, customer});
    tokenStorage.set('accessToken', accessToken);
    tokenStorage.set('refreshToken', refreshToken);
    const {setUser} = useAuthStore.getState();
    setUser(customer);
    return resp.data;
  } catch (error) {
    console.log('Customer Login Error', error);
    throw error;
  }
};

export const deliveryLogin = async (email: string, password: string) => {
  try {
    const resp = await axios.post(`${BASE_URL}/delivery/login`, {
      email,
      password,
    });
    const {accessToken, refreshToken, deliveryPartner} = resp.data;
    console.log({acce: resp.data});

    tokenStorage.set('accessToken', accessToken);
    tokenStorage.set('refreshToken', refreshToken);
    const {setUser} = useAuthStore.getState();
    setUser(deliveryPartner);
    return resp.data;
  } catch (error) {
    console.log('Customer Login Error', error);
    throw error;
  }
};

export const refetchUser = async (setUser: any) => {
  try {
    const resp = await appAxios.get(`/user`);
    const {user} = resp.data;
    setUser(user);
    return resp.data;
  } catch (error) {
    console.log('refetch user Error', error);
    throw error;
  }
};

export const refresh_tokens = async () => {
  try {
    const refreshToken = tokenStorage.getString('refreshToken');
    if (!refreshToken) console.log(' not token found');

    const response = await axios.post(`${BASE_URL}/refresh-token`, {
      refresh_token: refreshToken,
    });
    if (!response?.data) return;
    const new_access_token = response.data.accessToken;
    const new_refresh_token = response.data.refreshToken;
    tokenStorage.set('accessToken', new_access_token || '');
    tokenStorage.set('refreshToken', new_refresh_token || '');
    return new_refresh_token;
  } catch (error) {
    console.log({error});
    console.log('REFRESH TOKEN ERROR', error);
    tokenStorage.clearAll();
    resetAndNavigate('CustomerLogin');
    // throw error;
  }
};
