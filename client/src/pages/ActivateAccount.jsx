import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ActivateAccount = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const activateAccount = async () => {
      try {
        const res = await axios.post("/service/user/activation", { activation_token: token });
        toast.success(res.data.message);
        setLoading(false);

        setTimeout(() => {
          navigate("/signin");
        }, 1000);
      } catch (err) {
        toast.error(err.response?.data?.message || "Activation failed.");
        setLoading(false);
      }
    };

    if (token) activateAccount();
  }, [token, navigate]);

  return (
    <div className="p-4 text-center">
      {loading ? (
        <p>Activating your account...</p>
      ) : (
        <p>Activation process finished. Redirecting...</p>
      )}
    </div>
  );
};

export default ActivateAccount;
