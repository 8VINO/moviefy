// proxy.js
import express from "express"; 
import fetch from "node-fetch"; 
import cookieParser from "cookie-parser";
import cors from 'cors';

const app = express();
const PORT = 6969;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: '*'
}));

app.all("/", async (req, res) => {
  
  const urlParam = req.query.url;
  const userToken = req.cookies?.user_token || "TUA CHAVE DA API AQUI";

  if (!urlParam) {
    return res.status(400).json({ error: "URL obrigatória" });
  }

  // apenas headers essenciais
  const headers = {
    Authorization: `Bearer ${userToken}`,
    "Content-Type": req.headers["content-type"] || "application/json",
  };

  const fetchOptions = {
    method: req.method,
    headers,
  };

  if (!["GET", "HEAD"].includes(req.method)) {
    fetchOptions.body = req.body && Object.keys(req.body).length > 0 ? JSON.stringify(req.body) : undefined;
  }

  try {
    const response = await fetch("https://api.themoviedb.org/3" + urlParam, fetchOptions);

    let data;
    try {
      data = await response.json();
    } catch {
      data = await response.text();
    }

    res.status(response.status).send(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy rodando em http://localhost:${PORT}`);
});
