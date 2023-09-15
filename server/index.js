import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";
import express from "express";
import cors from "cors";

process.env.GOOGLE_APPLICATION_CREDENTIALS;

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

app.use(
  cors({
    origin: "*",
  })
);

app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

initializeApp({
  credential: applicationDefault(),
  projectId: "fir-learning-5f5f2",
});

app.use("/send", (req, res) => {
  const { fcmToken, title, body } = req.body;
  const message = {
    notification: {
      title,
      body,
    },
    token: fcmToken,
  };

  getMessaging()
    .send(message)
    .then((response) => {
      res.status(200).json({
        message: "Successfully sent message",
        // token: fcmToken,
      });
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      res.status(400).send(error);
      console.log("error:", error);
    });
});

app.listen(4000, () => console.log("Server listening on port: 4000"));
