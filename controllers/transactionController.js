const Transaction = require('../models/Transaction');
const { transactionSchema } = require('../validators');

// @desc    Create new transaction
// @route   POST /transactions
// @access  Private
const createTransaction = async (req, res) => {
    try {
        const validatedData = transactionSchema.parse(req.body);

        const transaction = await Transaction.create({
            user: req.user._id,
            ...validatedData,
            date: validatedData.date ? new Date(validatedData.date) : Date.now(),
        });

        res.status(201).json(transaction);
    } catch (error) {
        res.status(400).json({ message: error.errors || error.message });
    }
};

// @desc    Get user transactions
// @route   GET /transactions
// @access  Private
const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user._id }).sort({ date: -1 });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get monthly summary
// @route   GET /transactions/monthly-summary
// @access  Private
const getMonthlySummary = async (req, res) => {
    try {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1; // 1-12

        const startOfMonth = new Date(`${currentYear}-${currentMonth}-01`);
        const endOfMonth = new Date(currentYear, currentMonth, 0, 23, 59, 59);

        const summary = await Transaction.aggregate([
            {
                $match: {
                    user: req.user._id,
                    date: { $gte: startOfMonth, $lte: endOfMonth },
                },
            },
            {
                $group: {
                    _id: { type: '$type', category: '$category' },
                    totalAmount: { $sum: '$amount' },
                },
            },
        ]);

        const formattedSummary = summary.map(item => ({
            type: item._id.type,
            category: item._id.category,
            totalAmount: item.totalAmount
        }));

        res.json(formattedSummary);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a transaction
// @route   PUT /transactions/:id
// @access  Private
const updateTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        if (transaction.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to update this transaction' });
        }

        const validatedData = transactionSchema.partial().parse(req.body);

        const updatedTransaction = await Transaction.findByIdAndUpdate(
            req.params.id,
            { ...validatedData, date: validatedData.date ? new Date(validatedData.date) : transaction.date },
            { new: true }
        );

        res.json(updatedTransaction);
    } catch (error) {
        res.status(400).json({ message: error.errors || error.message });
    }
};

// @desc    Delete a transaction
// @route   DELETE /transactions/:id
// @access  Private
const deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        if (transaction.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to delete this transaction' });
        }

        await transaction.deleteOne();

        res.json({ message: 'Transaction removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createTransaction,
    getTransactions,
    getMonthlySummary,
    updateTransaction,
    deleteTransaction,
};
