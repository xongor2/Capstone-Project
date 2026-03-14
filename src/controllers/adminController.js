const User = require('../models/User');
const Transaction = require('../models/Transaction');

// @desc    Admin specific dashboard overview
// @route   GET /admin/overview
// @access  Private/Admin
const getOverview = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        
        const totalIncomeAgg = await Transaction.aggregate([
            { $match: { type: 'income' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        const totalExpenseAgg = await Transaction.aggregate([
            { $match: { type: 'expense' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        
        const totalIncome = totalIncomeAgg.length > 0 ? totalIncomeAgg[0].total : 0;
        const totalExpense = totalExpenseAgg.length > 0 ? totalExpenseAgg[0].total : 0;

        const topCategories = await Transaction.aggregate([
            { $match: { type: 'expense' } },
            { $group: { _id: '$category', totalSpent: { $sum: '$amount' } } },
            { $sort: { totalSpent: -1 } },
            { $limit: 3 }
        ]);

        res.json({
            totalUsers,
            totalIncome,
            totalExpense,
            topCategories,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getOverview,
};
