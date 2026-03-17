const Transaction = require('../models/Transaction');
const { transactionSchema } = require('../validators');

// @desc    Create new transaction
// @route   POST /transactions
// @access  Private
const createTransaction = async (req, res) => {
    const validatedData = transactionSchema.parse(req.body);

    const transaction = await Transaction.create({
        user: req.user._id,
        ...validatedData,
        date: validatedData.date ? new Date(validatedData.date) : Date.now(),
    });

    res.status(201).json(transaction);
};

// @desc    Get user transactions
// @route   GET /transactions?month=X&year=YYYY
// @access  Private
const getTransactions = async (req, res) => {
    const filter = { user: req.user._id };

    const month = parseInt(req.query.month);
    const year = parseInt(req.query.year);

    if (month && year) {
        const startOfMonth = new Date(Date.UTC(year, month - 1, 1));
        const endOfMonth = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999));
        filter.date = { $gte: startOfMonth, $lte: endOfMonth };
    }

    const transactions = await Transaction.find(filter).sort({ date: -1 });
    res.json(transactions);
};

// @desc    Get monthly summary
// @route   GET /transactions/monthly-summary?month=X&year=YYYY
// @access  Private
const getMonthlySummary = async (req, res) => {
    const year = parseInt(req.query.year) || new Date().getFullYear();
    const month = parseInt(req.query.month) || new Date().getMonth() + 1; // 1-12

    const startOfMonth = new Date(Date.UTC(year, month - 1, 1));
    const endOfMonth = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999));

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
};

// @desc    Update a transaction
// @route   PUT /transactions/:id
// @access  Private
const updateTransaction = async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
        res.status(404);
        throw new Error('Transaction not found');
    }

    if (transaction.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized to update this transaction');
    }

    const validatedData = transactionSchema.partial().parse(req.body);

    const updatedTransaction = await Transaction.findByIdAndUpdate(
        req.params.id,
        { ...validatedData, date: validatedData.date ? new Date(validatedData.date) : transaction.date },
        { new: true }
    );

    res.json(updatedTransaction);
};

// @desc    Delete a transaction
// @route   DELETE /transactions/:id
// @access  Private
const deleteTransaction = async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
        res.status(404);
        throw new Error('Transaction not found');
    }

    if (transaction.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized to delete this transaction');
    }

    await transaction.deleteOne();

    res.json({ message: 'Transaction removed' });
};

module.exports = {
    createTransaction,
    getTransactions,
    getMonthlySummary,
    updateTransaction,
    deleteTransaction,
};
