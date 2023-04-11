import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const authClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

async function login(user: { email: string; password: string }) {
  const res = await authClient.post("/login", user);
  return res.data;
}

async function getUserToConfirm(registrationUUID: string) {
  const res = await authClient.get("/get-user-to-confirm", {
    params: { registrationUUID },
  });

  return res.data;
}

async function confirmUser(password: string, registrationUUID: string) {
  const res = await authClient.post("/confirm-user", {
    password,
    registrationUUID,
  });
  return res.data;
}

const authApi = {
  confirmUser,
  getUserToConfirm,
  login,
};

export default authApi;
