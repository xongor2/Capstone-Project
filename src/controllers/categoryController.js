const getCategories = async (req, res) => {
    const predefinedCategories = [
        { name: 'Food', type: 'expense' },
        { name: 'Rent', type: 'expense' },
        { name: 'Salary', type: 'income' },
        { name: 'Utilities', type: 'expense' },
        { name: 'Entertainment', type: 'expense' },
        { name: 'Transport', type: 'expense' },
        { name: 'Freelance', type: 'income' },
    ];
    res.json(predefinedCategories);
};

module.exports = {
    getCategories,
};
