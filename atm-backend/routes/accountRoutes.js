const express = require('express');
const router = express.Router();
const Account = require('../models/Account');
const User = require('../models/User');
const fetchuser = require('../middleware/middleware');
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL,
    pass: process.env.PASS
  }
});

const sendMail = async (email, otp) => {
  const mailOptions = {
    from: process.env.MAIL,
    to: email,
    subject: 'OTP for ATM',
    text: `Your OTP is ${otp}`
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
}

router.post('/send-otp', fetchuser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    const email = user.email;

    const otp = generateOTP();
    const updateAccount = await Account.findOneAndUpdate({ user: req.user.id }, { otp: otp }, { new: true });
    if (!updateAccount) {
      return res.status(404).send({ error: "Account not found" });
    }

    sendMail(email, otp);

    res.send({ message: "OTP sent successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});


router.post('/verify-otp', fetchuser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const { otp } = req.body;
    const account = await Account.findOne({ user: req.user.id });
    if (!account) {
      return res.status(404).send({ error: "Account not found" });
    }
    console.log(account.otp, otp);
    if (otp === account.otp) {
      account.otp = null;
      await account.save();
      res.json({ message: "OTP verified successfully", verified: true });
    } else {
      res.status(400).send({ error: "Invalid OTP" });
    }
  }
  catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.get('/', fetchuser, async (req, res) => {
  try {
    const account = await Account.findOne({ user: req.user.id });
    if (!account) {
      return res.status(404).send({ error: "Account not found" });
    }
    res.json(account);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

const sendAmountUpdationMail = async (email, amount, updatedAmount, type) => {
  console.log(email, amount, updatedAmount, type);
  const mailOptions = {
    from: process.env.MAIL,
    to: email,
    subject: 'Amount Updated',
    text: `Your account has been ${type}ed with ₹${amount}. Your updated balance is ₹${updatedAmount}`
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}


router.post('/deposit', fetchuser, async (req, res) => {
  try {
    const { amount } = req.body;
    if (amount <= 0 || amount % 500 !== 0) {
      return res.status(400).send({ error: "Invalid amount" });
    }

    const account = await Account.findOne({ user: req.user.id });
    if (!account) {
      return res.status(404).send({ error: "Account not found" });
    }
    account.balance += parseInt(amount);
    await account.save();

    const user = await User.findById(req.user.id);
    sendAmountUpdationMail(user.email, amount, account.balance, "credit");
    res.json(account);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.post('/withdraw', fetchuser, async (req, res) => {
  try {
    const { amount } = req.body;
    if (amount <= 0 || amount % 500 !== 0) {
      return res.status(400).send({ error: "Invalid amount" });
    }

    const account = await Account.findOne({ user: req.user.id });
    if (!account) {
      return res.status(404).send({ error: "Account not found" });
    }
    if (account.balance < amount) {
      return res.status(400).send({ error: "Insufficient balance" });
    }
    account.balance -= amount;
    await account.save();

    const user = await User.findById(req.user.id);
    sendAmountUpdationMail(user.email, amount, account.balance, "debit");

    res.json(account);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.post('/transfer', fetchuser, async (req, res) => {
  try {
    const { amount, toAccount } = req.body;
    if (amount <= 0) {
      return res.status(400).send({ error: "Invalid amount" });
    }

    const account = await Account.findOne({ user: req.user.id });
    if (!account) {
      return res.status(404).send({ error: "Account not found" });
    }
    if (account.balance < amount) {
      return res.status(400).send({ error: "Insufficient balance" });
    }

    const toAccountData = await Account.findOne({ accountNumber: toAccount });
    if (!toAccountData) {
      return res.status(404).send({ error: "Account not found" });
    }

    account.balance -= amount;
    toAccountData.balance += parseInt(amount);
    await account.save();
    await toAccountData.save();

    const sender = await User.findById(req.user.id);
    const receiver = await User.findById(toAccountData.user);
    sendAmountUpdationMail(sender.email, amount, account.balance, "debit");
    sendAmountUpdationMail(receiver.email, amount, toAccountData.balance, "credit");

    res.json(account);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
})










module.exports = router;