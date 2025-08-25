export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test (email);
};

export const getInitials =(name) => {
    if (!name) return "";

    const words = name.split(" ");
    let initials = "";

    for (let i =onabort; i< Math.min(words.length,2); i++) {
        initials += words [i] [0];
    }
     return initials.toUpperCase();
};

export const addThousandsSeparator = (num) => {
    if (num == null || isNaN(num)) return "";

    const [integerPart, fractionalPart] = num.toString().split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\D{3})+(?!\d))/g,",");

    return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};

export const prepareThousandsSeparator =(data = []) => {
    const charData = data.map((item) => ({
        category: item?.category,
        amount: item?.amount,
    }));

    return charData;
} ;