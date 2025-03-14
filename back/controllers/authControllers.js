import { connect } from "getstream";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { StreamChat } from "stream-chat";
import dotenv from "dotenv";

dotenv.config();

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

const signup = async (req, res) => {
  try {
    const { fullName, password, username, avatarUrl, phoneNumber } = req.body;
    const userId = crypto.randomBytes(16).toString("hex");
    const serverClient = connect(api_key, api_secret, app_id);
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = serverClient.createUserToken(userId);
    res.status(200).json({
      token,
      fullName,
      userId,
      username,
      hashedPassword,
      phoneNumber,
      avatarUrl,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const serverClient = connect(api_key, api_secret, app_id);
    const client = StreamChat.getInstance(api_key, api_secret);
    const { users } = await client.queryUsers({ name: username });
    if (!users.length)
      return res.status(400).json({ message: "User not found" });

    const success = await bcrypt.compare(password, users[0].hashedPassword);
    const token = serverClient.createUserToken(users[0].id);
    if (success) {
      res.status(200).json({
        success: true,
        token,
        fullName: users[0].fullName,
        username,
        userId: users[0].id,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { login, signup };
