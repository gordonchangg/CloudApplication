// AdminRoute.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      try {
        if (user) {
          // Fetch the token to check for admin claims
          const token = await user.getIdTokenResult();
          setIsAdmin(!!token.claims.admin); // Check if 'admin' claim exists
        } else {
          // Redirect to login if no user is signed in
          navigate('/login');
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        navigate('/login'); // Fallback to login on error
      } finally {
        setLoading(false); // Ensure loading state is updated
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator
  }

  return isAdmin ? children : <div>Unauthorized Access</div>;
};

export default PrivateRoute;