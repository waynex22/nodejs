module.exports = {
    formatDate: function (date) {
        const parsedDate = new Date(date);

        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        };

        return parsedDate.toLocaleDateString(undefined, options);
    },
    isEqual: function (a, b, options) {
        if (a === b) {
            return options.fn(this);
        }
        return options.inverse(this);
    },
    sequence: function (n) {
        return Array.from({ length: n }, (_, i) => i + 1);
    },
    sequenceAg: function (n) {
        return Array.from({ length: n / 2}, (_, i) => i + 1);
    }
};
