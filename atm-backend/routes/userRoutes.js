const express = require('express');
const User = require('../models/User');
const Account = require('../models/Account');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcryptjs');
const fetchuser = require('../middleware/middleware');

// For User
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
})

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

    res.json({
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
      },
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
})

router.post('/setup-account', fetchuser, async (req, res) => {
  try {
    const { id } = req.user;
    const { accountNumber, accountType, balance, bankName } = req.body;

    if (!accountNumber || !accountType || !balance || !bankName) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const existingAccount = await Account.findOne({ accountNumber });
    if (existingAccount) {
      return res.status(400).json({ message: "Account already exists" });
    }

    const account = new Account({ user: id, accountNumber, accountType, balance, bankName });
    await account.save();

    res.json(account);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
})

router.get('/account', fetchuser, async (req, res) => {
  try {
    const { id } = req.user;
    const account = await Account.findOne({ user: id });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.json(account);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
})



// User
// router.get('/getprofile', fetchuser,async (req, res) => {
//   try {
//     const { id } = req.user;
//     const user = await Applicant.findById(id);

//     if (!user) {
//       const user = await Recruiter.findById(id);
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }
//     }

//     res.json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// })



module.exports = router;