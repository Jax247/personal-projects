const crypto = require("crypto");
const { connect } = require("getstream");
const bcrypt = require("bcrypt");
const StreamChat = require("stream-chat").StreamChat;
require('dotenv').config();
const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

// Login logic
const login = async (req, res) => {
  try {
    // Connect to StreamChat
    // Query users with body username recieved from client
    // compare the PW and hashed PW
    // create and send token w the user data 
    const { username, password } = req.body;

    const serverClient = connect(api_key, api_secret, app_id);
    const client = StreamChat.getInstance(api_key, api_secret);

    const { users } = await client.queryUsers({ name: username });

    if (!users.length)
      return res.status(400).json({ message: "User not found" });

    let current_user = users[0];

    const success = await bcrypt.compare(password, current_user.hashedPW);

    const token = serverClient.createUserToken(current_user.id);

    if (success) {
      res.status(200).json({
        token,
        fullName: current_user.fullName,
        username,
        userID: current_user.id,
      });
    } else {
      res.status(500).json({ message: "Incorrect Password" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
};
const register = async (req, res) => {
  // get data from request body
  // make sure to hash password
  try {
    const { fullName, username, password, phoneNumber } = req.body;
    const userID = crypto.randomBytes(16).toString("hex");
    const serverClient = connect(api_key, api_secret, app_id);
    const hashedPW = await bcrypt.hash(password, 10);
    const token = serverClient.createUserToken(userID);

    res.status(200).json({
      token,
      fullName,
      username,
      userID,
      hashedPW,
      phoneNumber,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
};

module.exports = { register, login };
