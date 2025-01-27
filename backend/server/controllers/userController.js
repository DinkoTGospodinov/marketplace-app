const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      name,
      email,
      password, // Паролата ще бъде хеширана от модела
    });

    console.log("Before saving user:", newUser);

    await newUser.save();

    console.log("After saving user:", newUser);

    return res.status(201).json({ userId: newUser._id, message: "Registration successful" });
  } catch (error) {
    console.error("Error in register:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// exports.register = async (req, res) => {
//   const { name, email, password } = req.body;

//   // Валидация на входните данни
//   if (!name || !email || !password) {
//     return res.status(400).json({ message: "Please enter all fields" });
//   }

//   try {
//     // Проверка дали потребителят вече съществува
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Хеширане на паролата
//     const hashedPassword = await bcrypt.hash(password, 10);
//     console.log("hashedPassword:", hashedPassword);

//     // Създаване на нов потребител
//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     console.log("newUser:", newUser);

//     // Запазване в базата данни
//     await newUser.save();

//     console.log("New user saved:", newUser);

//     // Връщане на успешен отговор
//     return res.status(201).json({ userId: newUser._id, message: "Registration successful" });
//   } catch (error) {
//     console.error("Error in register:", error);

//     // Връщане на грешка
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Валидация на входните данни
  if (!email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  try {
    // Търсене на потребителя в базата данни
    const user = await User.findOne({ email });
    console.log("Stored user in DB:", user);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Проверка на паролата
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("isMatch:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Създаване на JWT токен
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "1h" }
    );

    // Връщане на успешен отговор
    return res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Error during login:", error);

    // Връщане на грешка
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error in profile:", error);

    // Връщане на грешка
    return res.status(500).json({ message: "Internal server error" });
  }
};
