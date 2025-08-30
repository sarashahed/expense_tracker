const express = require('express');
const router = express.Router();

const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { isValidObjectId, Types } = require("mongoose");
const { protect } = require("../middleware/authMiddleware"); // Import protect middleware
const { getDashboardData } = require('../controllers/dashboardControllers');

// const getDashboardData = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const userObjectId = new Types.ObjectId(String(userId));

//     //Fetch total income & expenses
//     const totalIncome = await Income.aggregate([
//       { $match: { userId: userObjectId } },
//       { $group: { _id: null, total: { $sum: "$amount" } } },
//     ]);

//     const totalExpense = await Expense.aggregate([
//       { $match: { userId: userObjectId } },
//       { $group: { _id: null, total: { $sum: "$amount" } } },
//     ]);

//     // Get income transactions in last 60 days
//     const last60DaysIncomeTransactions = await Income.find({
//       userId,
//       date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
//     }).sort({ date: -1 });

//     // Get total income for 60 days
//     const incomeLast60Days = last60DaysIncomeTransactions.reduce(
//       (sum, transaction) => sum + transaction.amount,
//       0
//     );

//     // Get expense transactions in the last 30 days
//     // ...add your logic here...

//     res.json({
//       totalIncome: totalIncome[0]?.total || 0,
//       totalExpense: totalExpense[0]?.total || 0,
//       incomeLast60Days,
//       // ...add other data as needed...
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error", error });
//   }
// };

// Protect the dashboard route
router.get('/', protect, getDashboardData);

module.exports = router;