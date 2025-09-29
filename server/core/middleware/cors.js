const cors = (req, res, next) => {
  const origin = req.headers.origin;

  const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://crm-cluster.vercel.app",
  ];

  const dynamicVercel = /^https:\/\/crm-cluster.*\.vercel\.app$/;

  if (allowedOrigins.includes(origin) || dynamicVercel.test(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, PATCH, DELETE, GET"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).json({});
  }

  next();
};

export default cors;
