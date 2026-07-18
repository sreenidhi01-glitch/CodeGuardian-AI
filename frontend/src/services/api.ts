import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export default api;

/* -----------------------------
   Upload File
------------------------------ */
export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

/* -----------------------------
   Scan Uploaded Code
------------------------------ */
export const scanCode = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/scan", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

/* -----------------------------
   Download PDF Report
------------------------------ */
export const downloadReport = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/report", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    responseType: "blob",
  });

  return response.data;
};

/* -----------------------------
   GitHub Pull Request Review
------------------------------ */
export const reviewGitHubPR = async (
  repo: string,
  pr_number: number,
  github_token?: string
) => {
  const response = await api.post("/github/review", {
    repo,
    pr_number,
    github_token,
  });

  return response.data;
};