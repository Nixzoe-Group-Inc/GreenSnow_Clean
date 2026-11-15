import axios from 'axios';
import { LoginData, RegisterData, ForgotPasswordData } from '../types/authTypes';

const BASE_URL = 'https://api.greensnowapp.ca';

/**
 * Log in a user (mock implementation).
 * @param data - The login credentials.
 * @returns A promise with the user's authentication data.
 */
export const login = async (data: LoginData) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (data.email === 'test@example.com' && data.password === 'password123') {
      return {
        message: 'Login successful!',
        user: { name: 'John Doe', email: 'test@example.com' },
        token: 'mock-jwt-token',
      };
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error: any) {
    throw error.response?.data?.message || 'Login failed. Please try again.';
  }
};

/**
 * Register a new user (mock implementation).
 * @param data - The registration details.
 * @returns A promise with the registration confirmation or user data.
 */
export const register = async (data: RegisterData) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (data.email === 'newuser@example.com') {
      return {
        message: 'Registration successful!',
        user: { name: data.name, email: data.email },
        token: 'mock-jwt-token',
      };
    } else {
      throw new Error('Email already exists');
    }
  } catch (error: any) {
    throw error.response?.data?.message || 'Registration failed. Please try again.';
  }
};

/**
 * Handle forgot password functionality (mock implementation).
 * @param data - The user's email for password recovery.
 * @returns A promise with a success message or token.
 */
export const forgotPassword = async (data: ForgotPasswordData) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (data.email === 'test@example.com') {
      return {
        message: 'Password reset link sent to your email!',
      };
    } else {
      throw new Error('Email not found');
    }
  } catch (error: any) {
    throw error.response?.data?.message || 'Password recovery failed. Please try again.';
  }
};
