import api from './api';
import { signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';

interface RegisterRoleData {
  role: string;
}

export const registerRole = async (data: RegisterRoleData) => {
  try {
    const response = await api.post('/users/register/role/', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

interface SocialAuthData {
  signup_method: 'google' | 'apple' | 'app';
  token: string;
  sessionId: string;
}

export const socialAuth = async (data: SocialAuthData) => {
  try {
    const url = `/users/register/social/${data.sessionId}/`;
    const response = await api.post(url, {
      signup_method: data.signup_method,
      [`${data.signup_method}_token`]: data.token,
    });
    return response.data;
  } catch (error: any) {
    console.error('Error in socialAuth:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      throw new Error(error.response.data.error || 'Failed to authenticate');
    } else if (error.request) {
      console.error('No response received:', error.request);
      throw new Error('No response received from the server');
    } else {
      console.error('Error message:', error.message);
      throw new Error('An unexpected error occurred');
    }
  }
};

interface AppRegisterData {
  sessionId: string;
  username: string;
  phone: string;
  email: string;
}

export const appRegister = async (data: AppRegisterData) => {
  try {
    const url = `/users/register/user/${data.sessionId}/`;
    const response = await api.post(url, {
      username: data.username,
      email: data.email,
      phone: data.phone,
    });
    return response.data;
  } catch (error: any) {
    console.error('Error in appRegister:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      throw new Error(error.response.data.error || 'Failed to register user');
    } else if (error.request) {
      console.error('No response received:', error.request);
      throw new Error('No response received from the server');
    } else {
      console.error('Error message:', error.message);
      throw new Error('An unexpected error occurred');
    }
  }
};

interface AppRegisterDataContinue {
  sessionId: string;
  home_address: string;
  date_of_birth: string;
  password: string;
}

export const appRegisterContinue = async (data: AppRegisterDataContinue) => {
  try {
    const url = `/users/register/personal-info/${data.sessionId}/`;
    const response = await api.post(url, {
      home_address: data.home_address,
      date_of_birth: data.date_of_birth,
      password: data.password,
    });
    return response.data;
  } catch (error: any) {
    console.error('Error in appRegisterContinue:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      throw new Error(error.response.data.error || 'Failed to continue registration');
    } else if (error.request) {
      console.error('No response received:', error.request);
      throw new Error('No response received from the server');
    } else {
      console.error('Error message:', error.message);
      throw new Error('An unexpected error occurred');
    }
  }
};








/**
 * Verify OTP
 * @param phone - User's phone number
 * @param code - OTP code entered by the user
 * @param sessionId - Session ID for the current user
 */
export const verifyOtp = async (phone: string, code: string, sessionId: string) => {
  try {
    const response = await api.post(`/users/register/otp/${sessionId}/`, {
      code,
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    console.error('Error in verifyOtp:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      return {
        success: false,
        error: error.response.data.error || 'Failed to verify OTP',
      };
    } else if (error.request) {
      console.error('No response received:', error.request);
      return {
        success: false,
        error: 'No response received from the server',
      };
    } else {
      console.error('Error message:', error.message);
      return {
        success: false,
        error: 'An unexpected error occurred',
      };
    }
  }
};

/**
 * Resend OTP
 * @param phone - User's phone number
 * @param sessionId - Session ID for the current user
 */
export const resendOtp = async (phone: string, sessionId: string) => {
  try {
    const response = await api.put(`/users/register/otp/${sessionId}/`, {
      phone,
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    console.error('Error in resendOtp:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      return {
        success: false,
        error: error.response.data.error || 'Failed to resend OTP',
      };
    } else if (error.request) {
      console.error('No response received:', error.request);
      return {
        success: false,
        error: 'No response received from the server',
      };
    } else {
      console.error('Error message:', error.message);
      return {
        success: false,
        error: 'An unexpected error occurred',
      };
    }
  }
};


export const verifyAccount = async ({
  session_id,
  userData,
}: {
  session_id: string;
  userData: {
    username: string;
    email: string;
    phone: string;
    homeAddress: string;
    dateOfBirth: string;
    role: string;
    password: string;
  };
}) => {
  try {
    const response = await api.post(`/users/register/complete/${session_id}/`, userData);
    return response.data;
  } catch (error) {
    console.error('Error verifying account:', error);

    // Safely extract the error message
    let errorMessage = 'Account verification failed';
    if (typeof error === 'object' && error !== null) {
      const axiosError = error as { response?: { data?: { error?: string } } };
      if (typeof axiosError.response?.data?.error === 'string') {
        errorMessage = axiosError.response.data.error;
      }
    }

    throw new Error(errorMessage);
  }
};





interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  sessionId: string;
  nextStep: string;
}

export const login = async (data: LoginCredentials): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/users/signin/', data);
    if (!response.data.sessionId || !response.data.nextStep) {
      throw new Error('Invalid response from server');
    }
    return response.data;
  } catch (error: any) {
    console.error('Error in login:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      throw new Error(error.response.data.error || 'Failed to login');
    } else if (error.request) {
      console.error('No response received:', error.request);
      throw new Error('No response received from the server');
    } else {
      console.error('Error message:', error.message);
      throw new Error('An unexpected error occurred');
    }
  }
};




interface OTPDeliveryMethodData {
  method: string;
  sessionId: string;
}

export const selectOTPDeliveryMethod = async (data: OTPDeliveryMethodData) => {
  try {
    const response = await api.post(`/users/signin/otp-method/${data.sessionId}/`, {
      method: data.method,
    });
    return response.data;
  } catch (error: any) {
    console.error('Error in selectOTPDeliveryMethod:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      throw new Error(error.response.data.message || 'Failed to select OTP delivery method');
    } else if (error.request) {
      console.error('No response received:', error.request);
      throw new Error('No response received from the server');
    } else {
      console.error('Error message:', error.message);
      throw new Error('An unexpected error occurred');
    }
  }
};




interface OTPRequest {
  sessionId: string;
  code: string;
}

interface OTPResponse {
  sessionId: string;
  nextStep: string;
  message: string;
  role: string;
}


export const signInOTPForm = async (data: OTPRequest): Promise<OTPResponse> => {
  try {
    const response = await api.post<OTPResponse>(`/users/signin/otp-verification/${data.sessionId}/`, { code: data.code });
    return response.data;
  } catch (error: any) {
    console.error('Error in verifyOtp:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      throw new Error(error.response.data.error || 'Failed to verify OTP');
    } else if (error.request) {
      console.error('No response received:', error.request);
      throw new Error('No response received from the server');
    } else {
      console.error('Error message:', error.message);
      throw new Error('An unexpected error occurred');
    }
  }
};
