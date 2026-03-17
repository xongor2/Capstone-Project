const getCategories = async (req, res) => {
    const predefinedCategories = [
        { name: 'Food', type: 'expense' },
        { name: 'Rent', type: 'expense' },
        { name: 'Salary', type: 'income' },
        { name: 'Utilities', type: 'expense' },
        { name: 'Entertainment', type: 'expense' },
        { name: 'Transport', type: 'expense' },
        { name: 'Freelance', type: 'income' },
        { name: 'Shopping', type: 'expense' },
        { name: 'Family Support', type: 'expense' },
        { name: 'Education', type: 'expense' },
        { name: 'Mobile Internet', type: 'expense' },
        { name: 'WiFi Internet', type: 'expense' },
        { name: 'Health Care', type: 'expense' },
        { name: 'Helping Out a Friend', type: 'expense' },
        { name: 'Debt', type: 'expense' },
    ];
    res.json(predefinedCategories);
};

module.exports = {
    getCategories,
};
