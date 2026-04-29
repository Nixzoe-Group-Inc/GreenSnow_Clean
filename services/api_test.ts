import axios from 'axios';
import { EmployeeProps, EmployerProps, OngoingShiftProps, ShiftApplicationProps, ShiftDetailsProps, ShiftRankProps, ShiftRatingsProps, UpcomingShiftProps, UserProps } from './types';
// const API_URL_SHIFTS = 'https://pokeapi.co/api/v2/pokemon/ditto';
  // Define the base URL of your Django API
const API_SHIFTS_URL = 'http://192.168.43.55:8000/api/shifts/';
// const API_SHIFTS_URL = 'http://192.168.243.33:8000/api/shifts/';
const BASE_URL = 'http://192.168.43.55:8000/api';
// const BASE_URL = 'http://192.168.243.33:8000/api/';


export const fetchShifts = async (): Promise<ShiftDetailsProps[]> => {
    try {
      const response = await axios.get<ShiftDetailsProps[]>(API_SHIFTS_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching items:', error);
      throw error;
    }
  };

  export const applyForShift = async (shiftId: string, employeeId: string) => {
    try {
      const response = await axios.post(`${BASE_URL}/shifts/${shiftId}/apply/`, {
        employee_id: employeeId,
      });
  
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.error || "Something went wrong.");
      } else {
        throw new Error("Network error. Please try again.");
      }
    }
  };

  //fetch all upcoming shifts data
export const fetchUpcomingShifts = async (): Promise<UpcomingShiftProps[]> => {
    try {
      const UPCOMING_URL = BASE_URL + "/shifts/upcoming/";
      const response = await axios.get<UpcomingShiftProps[]>(UPCOMING_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching items:', error);
      throw error;
    }
  };

  //fetch all ongoing shifts data
export const fetchOngoingShifts = async (): Promise<OngoingShiftProps[]> => {
    try {
      const ONGOING_URL = BASE_URL + "/shifts/ongoing/";
      const response = await axios.get<OngoingShiftProps[]>(ONGOING_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching items:', error);
      throw error;
    }
  };



  
  // Create an Axios instance
  const apiClient = axios.create({
    baseURL: API_SHIFTS_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  // Function to create a new Shift
  export const createShift = async (shiftData: ShiftDetailsProps, token?: string) => {
    console.log("inside create shift")
    console.log(shiftData.date);
    try {
      const response = await apiClient.post("", shiftData);
      return response.data;
    } catch (error) {
      console.error("Error creating shift:", error);
      throw error;
    }
  };
  
  // Function to create a new Shift ranking
  export const createShiftRanking = async (RankData: ShiftRankProps, token?: string) => {
    console.log("inside Shift ranking")
    console.log(RankData.rating);
    try {
      const URL = BASE_URL +  "/ranksrates/shiftrating/";
      const response = await axios.post(URL, RankData);
      return response.data;
    } catch (error) {
      console.error("Error creating shift ranking:", error);
      throw error;
    }
  };

  // // Function to create a new ongoing shift
  // export const createOngoingShift = async (Data: OngoingShiftProps, token?: string) => {
  //   console.log("inside Ongoing Shift")
  //   console.log(Data.shift);
  //   try {
  //     const URL = BASE_URL +  "/shifts/ongoing/";
  //     const response = await axios.post(URL, Data);
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error creating shift ranking:", error);
  //     throw error;
  //   }
  // };

  // // Function to create a new shift application
  // export const createShiftApplication = async (Data: ShiftApplicationProps, token?: string) => {
  //   console.log("inside Ongoing Shift")
  //   console.log(Data.shift);
  //   try {
  //     const URL = BASE_URL +  "/shiftapplications/";
  //     const response = await axios.post(URL, Data);
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error creating shift application:", error);
  //     throw error;
  //   }
  // };

  // Function to update Ongoing Shift
  export const updateOngoingShift = async (ongoingData: OngoingShiftProps, id: string, token?: string) => {
    try {
      const UPDATE_URL = API_SHIFTS_URL + "ongoing/" + id + "/";
      console.log("LOg from put")
      console.log(ongoingData.actual_end_time)
      console.log(id);
      const response = await axios.put(UPDATE_URL, {
        ...ongoingData,
        actual_end_time: ongoingData.actual_end_time.toISOString(), // Convert to Django-compatible format
        updated_at: ongoingData.updated_at.toISOString(), // Convert to Django-compatible format
      });
      return response.data;
    } catch (error) {
      console.error("Error updating ongoing:", error);
      throw error;
    }
  };

  // Function to complete all ongoing shifts for a given shift ID
export const completeOngoingShifts = async (shiftId: string): Promise<any> => {
  try {
    const response = await axios.post(`${BASE_URL}/shifts/${shiftId}/complete/`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error completing shifts.");
  }
};


// Convert upcoming shift to ongoing
export const startOngoingShift = async (shiftId: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/shifts/${shiftId}/start/`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error starting shift.");
  }
};

  // Function to update Shift
  export const updateShift = async (shiftData: ShiftDetailsProps, id: string, token?: string) => {
    try {
      const UPDATE_URL = API_SHIFTS_URL + id + "/";
      console.log("LOg from put")
      console.log(shiftData.start_time)
      console.log(id);
      const response = await axios.put(UPDATE_URL, {
        ...shiftData,
        date: shiftData.date.toISOString(), // Convert to Django-compatible format
        start_time: shiftData.start_time.toISOString(), // Convert to Django-compatible format
        end_time: shiftData.end_time.toISOString(), // Convert to Django-compatible format
        created_at: shiftData.created_at.toISOString(), // Convert to Django-compatible format
        updated_at: shiftData.updated_at.toISOString(), // Convert to Django-compatible format
      });
      return response.data;
    } catch (error) {
      console.error("Error updating shift:", error);
      throw error;
    }
  };

  // Function to fetch Shift data
  export const fetchShift = async (id: string): Promise<ShiftDetailsProps> => {
      
      try {
        const SHIFT_URL = API_SHIFTS_URL + id;
        const response = await axios.get(SHIFT_URL);
        return response.data;
      } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
      }
  };

  // Function to fetch Shifts by employer
  export const fetchShiftsByEmployer = async (employer_id: string): Promise<ShiftDetailsProps[]> => {
      
      try {
        const SHIFT_URL = BASE_URL + "/shifts/employer/" + employer_id;
        const response = await axios.get(SHIFT_URL);
        return response.data;
      } catch (error) {
        console.error('Error fetching employer shifts:', error);
        throw error;
      }
  };

  // Function to update shift status
export const updateShiftStatus = async (shiftId: string, newStatus: string) => {
    try {
        const response = await axios.patch(
            `${BASE_URL}/shifts/${shiftId}/update-status/`,
            { status: newStatus },
            { headers: { "Content-Type": "application/json" } }
        );

        console.log("Shift status updated:", response.data);
        alert(response.data.message);
        return response.data;
    } catch (error) {
        console.error("Error updating shift status:", error);
        alert("Failed to update shift status");
    }
};

  // Function to fetch All Users
  export const fetchUsers = async (): Promise<UserProps[]> => {
      try {
        const URL = BASE_URL + '/users/';
        const response = await axios.get(URL);
        return response.data;
      } catch (error) {
        console.error('Error fetching User Data items:', error);
        throw error;
      }
  };

  // Function to fetch User data
  export const fetchUser = async (id: string): Promise<UserProps> => {
    console.log("inside fetch user");
    console.log("id is", id);
      
      try {
        const URL = BASE_URL + '/users/' + id + '/';
        const response = await axios.get(URL);
        return response.data;
      } catch (error) {
        console.error('Error fetching User Data items:', error);
        throw error;
      }
  };
  // Function to fetch Shift Ratings
 export const fetchShiftRatings = async (shiftId: string): Promise<ShiftRatingsProps> => {
    try {
        const response = await axios.get(`${BASE_URL}/ranksrates/${shiftId}/ratings/`);
        console.log("Shift Ratings:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching shift ratings:", error);
        throw error;
    }
};

  // Function to send PATCH request to update 'is_verified' to True
  export const verifyUser = async (userId: string) => {
    try {
        const response = await axios.patch(`${BASE_URL}/users/${userId}/verify/`);
        console.log("User verification updated:", response.data);
    } catch (error) {
        console.error("Error verifying user:", error);
        throw error;
    }
};

// Function to delete User
export const deleteUser = async (userId: string) => {
  try {
      const response = await axios.delete(`${BASE_URL}/users/${userId}/delete/`);
      console.log("User deleted:", response.data);
      alert("User deleted successfully");
  } catch (error) {
      console.error("Error deleting user:");
      alert("Failed to delete user");
  }
};

// Function to suspend/unsuspend user
export const toggleUserSuspension = async (userId: string) => {
  try {
      const response = await axios.patch(`${BASE_URL}/users/${userId}/suspend/`);
      console.log("User suspension status updated:", response.data);
      alert(response.data.message);  // Show success message
  } catch (error) {
      console.error("Error updating user suspension status:", error);
      alert("Failed to update user suspension status");
  }
};

  // Function to fetch User data
  export const fetchEmployerDetailsByUser = async (id: string): Promise<EmployerProps> => {
    console.log("inside employer details by user");
    console.log("id is", id);
      
      try {
        const URL = BASE_URL + '/employers/user/' + id + '/';
        const response = await axios.get(URL);
        return response.data;
      } catch (error) {
        console.error('Error fetching User Data items:', error);
        throw error;
      }
  };
  // Function to fetch user data by employee id
  export const fetchEmployeeDetailsByUser = async (id: string): Promise<EmployeeProps> => {
      
      try {
        const URL = BASE_URL + '/employees/user/' + id + '/';
        const response = await axios.get(URL);
        return response.data;
      } catch (error) {
        console.error('Error fetching Employee details from user table:', error);
        throw error;
      }
  };

  // Function to fetch Shift Applications
  export const fetchShiftApplications = async (employee_id: string): Promise<ShiftApplicationProps[]> => {
      
      try {
        const URL = BASE_URL + '/shiftapplications/employee/' + employee_id + '/';
        const response = await axios.get(URL);
        return response.data;
      } catch (error) {
        console.error('Error fetching User Data items:', error);
        throw error;
      }
  };

  // Function to fetch Shift Applications for employee
  export const fetchEmployeeShiftApplications = async (employee_id: string): Promise<ShiftApplicationProps[]> => {
      
      try {
        const URL = BASE_URL + '/shiftapplications/employee/' + employee_id + '/';
        const response = await axios.get(URL);
        return response.data;
      } catch (error) {
        console.error('Error fetching User Data items:', error);
        throw error;
      }
  };

  // Function to approve shift applications
export const updateShiftApplicationStatus = async (applicationId: string, newStatus: string) => {
    try {
        const response = await axios.patch(
            `${BASE_URL}/shiftapplications/${applicationId}/update-status/`,
            { status: newStatus }, // Request body
            { headers: { "Content-Type": "application/json" } } // Headers
        );

        console.log("Shift application status updated:", response.data);
        alert(response.data.message); // Show success message
        return response.data;
    } catch (error) {
        console.error("Error updating shift application status:");
        alert("Failed to update shift application status");
    }
};

  // Function to delete Shift
  export const deleteShift = async (id: string): Promise<ShiftDetailsProps> => {
      
      try {
        const SHIFT_URL = API_SHIFTS_URL + id + "/";
        const response = await axios.delete(SHIFT_URL);
        return response.data;
      } catch (error) {
        console.error('Error deleting shift:', error);
        throw error;
      }
  };
  

  // Function to delete Upcoming Shift
  export const deleteUpcomingShift = async (id: string): Promise<ShiftDetailsProps> => {
      
      try {
        const SHIFT_URL = BASE_URL + "/shifts/upcoming/" + id + "/";
        const response = await axios.delete(SHIFT_URL);
        return response.data;
      } catch (error) {
        console.error('Error deleting shift:', error);
        throw error;
      }
  };

   // Function to fetch upcoming Shift by employer
   export const fetchUpcomingShiftByEmployer = async (id: string): Promise<UpcomingShiftProps[]> => {
    console.log("inside fetch upcoming shift");
    console.log("id for upcoming shift", id);
  try {
    const UPCOMING_URL = BASE_URL + "/shifts/upcoming/employer/" + id + "/";
    const response = await axios.get(UPCOMING_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching upcoming shift:', error);
    throw error;
  }
};

   // Function to fetch upcoming Shifts by employee 
   export const fetchUpcomingShiftsByEmployee = async (id: string): Promise<UpcomingShiftProps[]> => {
    console.log("inside fetch upcoming shift");
    console.log("id for upcoming shift", id);
  try {
    const UPCOMING_URL = BASE_URL + "/shifts/upcoming/employee/" + id + "/";
    const response = await axios.get(UPCOMING_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching upcoming shift by employee:', error);
    throw error;
  }
};

   // Function to fetch upcoming Shifts by shift 
   export const fetchUpcomingShiftByShift = async (id: string): Promise<UpcomingShiftProps> => {
    console.log("inside fetch upcoming shift");
    console.log("id for upcoming shift", id);
  try {
    const UPCOMING_URL = BASE_URL + "/shifts/upcoming/shift/" + id + "/";
    const response = await axios.get(UPCOMING_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching upcoming shift by shift:', error);
    throw error;
  }
};

   // Function to fetch ongoing Shift data
   export const fetchOngoingShift = async (id: string): Promise<OngoingShiftProps> => {
    console.log("inside fetch upcoming shift");
    console.log("id for upcoming shift", id);
  try {
    const UPCOMING_URL = BASE_URL + "/shifts/ongoing/shift/" + id + "/";
    const response = await axios.get(UPCOMING_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching ongoing shift:', error);
    throw error;
  }
};

 // Function to fetch upcoming Shifts by employee 
 export const fetchOngoingShiftsByEmployee = async (id: string): Promise<OngoingShiftProps[]> => {
  console.log("inside fetch upcoming shift");
  console.log("id for upcoming shift", id);
try {
  const UPCOMING_URL = BASE_URL + "/shifts/ongoing/employee/" + id + "/";
  const response = await axios.get(UPCOMING_URL);
  return response.data;
} catch (error) {
  console.error('Error fetching upcoming shift by employee:', error);
  throw error;
}
};

   // Function to fetch ongoing Shifts by employer
   export const fetchOngoingShiftsByEmployer = async (employer_id: string): Promise<OngoingShiftProps[]> => {
    console.log("inside fetcf ongo shift");
    console.log("employerid for ongoing shift", employer_id);
  try {
    const UPCOMING_URL = BASE_URL + "/shifts/ongoing/employer/" + employer_id + "/";
    const response = await axios.get(UPCOMING_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching ongoing shift by employer:', error);
    throw error;
  }
};



  //Employer APIs

   // Function to fetch employer data
   export const fetchEmployer = async (id: string): Promise<EmployerProps> => {
      console.log("inside fetch employer");
    try {
      const EMPLOYER_URL = BASE_URL + "/employers/" + id;
      const response = await axios.get(EMPLOYER_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching items:', error);
      throw error;
    }
};


  //Employee APIs

   // Function to fetch employee data
   export const fetchEmployee = async (id: string): Promise<EmployeeProps> => {
      console.log("inside fetch employee");
    try {
      const EMPLOYEE_URL = BASE_URL + "/employees/" + id + "/";
      const response = await axios.get(EMPLOYEE_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching employee:', error);
      throw error;
    }
};





  