const cors = (req, res, next) => {
  const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://crm-cluster.vercel.app",
  ];

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
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
