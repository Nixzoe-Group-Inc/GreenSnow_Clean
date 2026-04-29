// // app/(auth)/redirect.tsx
// import { useEffect } from 'react';
// import { View, ActivityIndicator, Text } from 'react-native';
// import { useRouter } from 'expo-router';
// import { useAuth } from '@/context/AuthContext';
// import tw from 'twrnc';

// const RedirectScreen = () => {
//   const router = useRouter();
//   const { user, loading } = useAuth();

//   useEffect(() => {
//     if (!loading) {
//       // Check if user exists and is verified
//       if (!user) {
//         router.replace('/login');
//         return;
//       }

//       if (!user.isVerified) {
//         router.replace('/verify-email');
//         return;
//       }

//       // Role-based routing
//       switch (user.role) {
//         case 'EMPLOYEE':
//           router.replace('/(employee)/dashboard');
//           break;
//         case 'EMPLOYER':
//           router.replace('/(employer)/dashboard');
//           break;
//         case 'MANAGEMENT':
//           router.replace('/(management)/dashboard');
//           break;
//         default:
//           router.replace('/');
//       }
//     }
//   }, [user, loading]);

//   return (
//     <View style={tw`flex-1 justify-center items-center bg-gray-50`}>
//       <ActivityIndicator size="large" color="#068A2D" />
//       <Text style={tw`mt-4 text-gray-600`}>Setting up your experience...</Text>
//     </View>
//   );
// };

// export default RedirectScreen;