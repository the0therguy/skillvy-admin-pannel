import {useEffect} from 'react';
import {useRouter} from 'next/router';
import baseURL from "@/app/Components/BaseURL";

const useTokenRefresh = () => {
  const router = useRouter();

  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
          throw new Error("No refresh token found");
        }

        const response = await fetch(`${baseURL}refresh/`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({refresh: refreshToken}),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('access_token', data.access);
        } else {
          throw new Error("Failed to refresh token");
        }
      } catch (error) {
        console.error("Refresh token expired, redirecting to login...");
        router.push('/login');
      }
    };

    // Set interval to refresh every 5 minutes
    const interval = setInterval(refreshAccessToken, 300000); // 300000 ms = 5 minutes

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [router]);
};

export default useTokenRefresh;
