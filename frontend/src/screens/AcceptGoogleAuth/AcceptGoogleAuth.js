import React, { useEffect } from "react";
import { Box, Text } from "@mantine/core";
import { useNavigate, useSearchParams } from "react-router-dom";

const AcceptGoogleAuth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("token", token);
      navigate("/board");
    } else {
      navigate("/");
    }
  }, [navigate, searchParams]); // Added navigate and searchParams to the dependency array

  return (
    <Box>
      <Text>Loading ....</Text>
    </Box>
  );
};

export default AcceptGoogleAuth;
