import express from "express";
import fs from "fs";
import path from "path";
import { loginWithUsernamePasswordWithAuthResponse } from "@azure/ms-rest-nodeauth";
import { Environment } from "@azure/ms-rest-azure-env";

const app = express();

app.set('port', (process.env.PORT))

app.get("/api/subscriptions", async (req, res) => {
  const { email, password } = req.query as { email: string; password: string };
  if (!email || !password) {
    return res.status(400).json({
      msg: "please input email and password!",
    });
  }
  try {
    const authResponse = await loginWithUsernamePasswordWithAuthResponse(
      email,
      password,
	  {environment : Environment.ChinaCloud}
    );
    res.json(authResponse?.subscriptions);
  } catch (error) {
    res.status(500).send({ detail: error.message });
  }
});

app.listen(app.get('port'),function(){
    console.log('listening on port');
});

module.exports = app;
