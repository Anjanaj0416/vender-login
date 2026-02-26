"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { AppDispatch, RootState } from "@/store/store";
import { loginFailure, loginStart, loginSuccess } from "@/store/slices/authSlice";

// ─── Styled Components ────────────────────────────────────────────────────────

const PageWrapper = styled(Box)({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#ffffff",
});

const Card = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  maxWidth: 480,
  padding: "0 16px",
});

const LogoWrapper = styled(Box)({
  marginBottom: 32,
  textAlign: "center",
});

const StyledTextField = styled(TextField)({
  width: "100%",
  marginBottom: 16,
  "& .MuiOutlinedInput-root": {
    borderRadius: 6,
    backgroundColor: "#fff",
    "& fieldset": {
      borderColor: "#d0d0d0",
    },
    "&:hover fieldset": {
      borderColor: "#aaa",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#c0392b",
    },
  },
  "& input::placeholder": {
    color: "#aaa",
    fontSize: 14,
  },
});

// ─── TradeZ SVG Logo ──────────────────────────────────────────────────────────

const TradezLogo = () => (
  <svg
    width="120"
    height="100"
    viewBox="0 0 120 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <polygon points="60,10 100,55 75,55" fill="#f5a623" />
    <polygon points="20,55 60,10 45,55" fill="#f5a623" />
    <polygon points="20,55 75,55 60,85 45,70" fill="#f0c040" />
    <path
      d="M52,22 Q60,14 68,22"
      stroke="#c0392b"
      strokeWidth="4"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

// ─── Login Page ───────────────────────────────────────────────────────────────

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);
  const { enqueueSnackbar } = useSnackbar();

  const isFormFilled = username.trim() !== "" && password.trim() !== "";

  const handleSignIn = async () => {
    if (!isFormFilled) return;
    dispatch(loginStart());
    try {
      // TODO: Replace with your real API call
      // const res = await fetch("/api/auth/login", { method: "POST", body: JSON.stringify({ username, password }) });
      // Simulated success for now:
      await new Promise((r) => setTimeout(r, 800));
      dispatch(loginSuccess({ username }));
      enqueueSnackbar("Signed in successfully!", { variant: "success" });
    } catch {
      dispatch(loginFailure("Invalid credentials"));
      enqueueSnackbar("Invalid username or password.", { variant: "error" });
    }
  };

  return (
    <PageWrapper>
      <Card>
        {/* Logo */}
        <LogoWrapper>
          <TradezLogo />
          <Box mt={1}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                letterSpacing: 2,
                color: "#1a1a2e",
                fontSize: 26,
                lineHeight: 1,
              }}
            >
              TRADE
              <Box component="span" sx={{ color: "#c0392b" }}>
                Z
              </Box>
            </Typography>
            <Typography
              variant="caption"
              sx={{
                letterSpacing: 3,
                color: "#555",
                fontSize: 9,
                display: "block",
                textAlign: "center",
                mt: 0.5,
              }}
            >
              THE FUTURE MARKETPLACE
            </Typography>
          </Box>
        </LogoWrapper>

        {/* Heading */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: "#1a1a2e",
            mb: 3,
            fontSize: 18,
            textAlign: "center",
          }}
        >
          Sign in to your account to continue
        </Typography>

        {/* Username Field */}
        <StyledTextField
          placeholder="Username or Email"
          variant="outlined"
          size="medium"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />

        {/* Password Field */}
        <StyledTextField
          placeholder="Password"
          variant="outlined"
          size="medium"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((v) => !v)}
                  edge="end"
                  size="small"
                  sx={{ color: "#aaa" }}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Sign In Button */}
        <Button
          variant="contained"
          disableElevation
          fullWidth
          disabled={!isFormFilled || loading}
          onClick={handleSignIn}
          sx={{
            py: 1.5,
            borderRadius: "6px",
            fontSize: 15,
            fontWeight: 600,
            textTransform: "none",
            mb: 1.5,
            backgroundColor: isFormFilled ? "#c0392b" : "#d5d5d5",
            color: isFormFilled ? "#fff" : "#888",
            "&:hover": {
              backgroundColor: "#a93226",
            },
            "&.Mui-disabled": {
              backgroundColor: "#d5d5d5",
              color: "#aaa",
            },
          }}
        >
          {loading ? (
            <CircularProgress size={22} sx={{ color: "#fff" }} />
          ) : (
            "Sign In"
          )}
        </Button>

        {/* Forgot Password */}
        <Link
          href="#"
          underline="none"
          sx={{
            color: "#c0392b",
            fontSize: 14,
            fontWeight: 500,
            mb: 2,
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Forgot Password
        </Link>

        {/* Register */}
        <Typography variant="body2" sx={{ color: "#444", fontSize: 14 }}>
          New user?{" "}
          <Link
            href="#"
            underline="none"
            sx={{
              color: "#c0392b",
              fontWeight: 600,
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Register
          </Link>
        </Typography>
      </Card>
    </PageWrapper>
  );
}
