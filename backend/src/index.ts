import express, { json, Request, Response } from "express";
import {
  generateOTPServiceRateLimiter,
  resetPasswordServiceRateLimiter,
} from "./ratelimiters";

const app = express();
const PORT = 3000;

app.use(express.json());

// In memory otp store
const otpStore: Record<string, string> = {};

app.post("/generate-otp", (req: Request, res: Response) => {
  try {
    const email = req.body.email;

    if (!email) {
      return res
        .status(400)
        .json({ status: 400, message: "Email is required" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = otp;

    console.log(`OPT for ${email}:${otp}`);
    return res.status(200).json({
      status: 200,
      message: "OTP generated and logged successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  }
});

app.post("/reset-password", (req: Request, res: Response) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res
        .status(400)
        .json({ status: 400, message: "Email,OTP,New Password is required" });
    }

    if (otpStore[email] !== otp)
      return res.status(401).json({ status: 401, message: "Invalid OTP" });

    console.log(`Password for ${email} has been rest to ${newPassword}`);
    delete otpStore[email];
    return res
      .status(200)
      .json({ status: 200, message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  }
});

// Rate Limited APIs
app.post(
  "/rate-limit/generate-otp",
  generateOTPServiceRateLimiter,
  (req: Request, res: Response) => {
    try {
      const email = req.body.email;

      if (!email) {
        return res
          .status(400)
          .json({ status: 400, message: "Email is required" });
      }

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      otpStore[email] = otp;

      console.log(`OPT for ${email}:${otp}`);
      return res.status(200).json({
        status: 200,
        message: "OTP generated and logged successfully",
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ status: 500, message: "Internal server error" });
    }
  }
);

app.post(
  "/rate-limit/reset-password",
  resetPasswordServiceRateLimiter,
  (req: Request, res: Response) => {
    try {
      const { email, otp, newPassword } = req.body;

      if (!email || !otp || !newPassword) {
        return res
          .status(400)
          .json({ status: 400, message: "Email,OTP,New Password is required" });
      }

      if (otpStore[email] !== otp)
        return res.status(401).json({ status: 401, message: "Invalid OTP" });

      console.log(`Password for ${email} has been rest to ${newPassword}`);
      delete otpStore[email];
      return res
        .status(200)
        .json({ status: 200, message: "Password reset successfully" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ status: 500, message: "Internal server error" });
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
