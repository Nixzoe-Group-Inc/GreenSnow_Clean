import axios from 'axios';
import { LoginData, RegisterData, ForgotPasswordData } from '../types/authTypes';

// Mock Base URL (replace with actual API URL once available)
const BASE_URL = 'https://your-api-base-url.com/api'; // Replace with your actual API base URL

/**
 * Log in a user (mock implementation).
 * @param data - The login credentials.
 * @returns A promise with the user's authentication data.
 */
export const login = async (data: LoginData) => {
  try {
    // Simulate an API delay
    await new Promise(resolve => setTimeout(resolve, 1000)); // 1-second delay

    // Mock login logic
    if (data.email === 'test@example.com' && data.password === 'password123') {
      return {
        message: 'Login successful!',
        user: { name: 'John Doe', email: 'test@example.com' },
        token: 'mock-jwt-token', // Replace with actual token when available
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
    // Simulate an API delay
    await new Promise(resolve => setTimeout(resolve, 1000)); // 1-second delay

    // Mock registration logic
    if (data.email === 'newuser@example.com') {
      return {
        message: 'Registration successful!',
        user: { name: data.name, email: data.email },
        token: 'mock-jwt-token', // Replace with actual token when available
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
    // Simulate an API delay
    await new Promise(resolve => setTimeout(resolve, 1000)); // 1-second delay

    // Mock forgot password logic
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
