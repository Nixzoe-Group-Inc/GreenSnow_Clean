// import { secureStore } from "@/utils/storage";
// import { login } from "../(auth)/services/authService";
// import { router } from "expo-router";

// export type Role = 'EMPLOYEE' | 'EMPLOYER' | 'MANAGEMENT';


// export interface LoginData {
//     email: string;
//     password: string;
//   }
  
//   export interface RegisterData {
//     name: string;
//     email: string;
//     password: string;
//     confirmPassword: string;
//   }
  
//   export interface ForgotPasswordData {
//     email: string;
//   }
  
// // First, define proper types in your auth types file (types/auth.ts)
// export interface AuthResponse {
//     access: string;
//     refresh: string;
//     user: {
//       email: string;
//       role: 'EMPLOYEE' | 'EMPLOYER' | 'MANAGEMENT';
//       isVerified: boolean;
//     };
//   }
  
//   // Updated handler with error handling
//   const handleAuthSuccess = async (data: AuthResponse) => {
//     try {
//       // Validate response structure
//       if (!data?.access || !data?.refresh || !data?.user) {
//         throw new Error('Invalid authentication response');
//       }
  
//       // Store tokens
//       await secureStore.setItem('access_token', data.access);
//       await secureStore.setItem('refresh_token', data.refresh);
      
//       // Update auth state
//       login(data.user);
      
//       // Navigate based on verification status
//       if (data.user.isVerified) {
//         router.replace({
//           pathname: '/redirect',
//           params: { role: data.user.role }
//         });
//       } else {
//         router.replace('/verify-email');
//       }
      
//     } catch (error) {
//       console.error('Authentication failed:', error);
//       Alert.alert(
//         'Authentication Error',
//         error.message || 'Failed to complete authentication'
//       );
//       await secureStore.deleteItem('access_token');
//       await secureStore.deleteItem('refresh_token');
//     }
//   };