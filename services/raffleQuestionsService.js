const createIndexes = (max) => {
    let i, arr = [];
    for (i = 0; i < max; i++) {
        arr[i] = i + 1;
    }
    return arr;
}

const fisherYatesShuffle = (arr) => {
    let p, n, tmp;
    for (p = arr.length; p;) {
        n = Math.random() * p-- | 0;
        tmp = arr[n];
        arr[n] = arr[p];
        arr[p] = tmp;
    }
    return arr;
}

const ruffleQuestions = (contents) => {
    const data = contents[0].data.filter(data => {
        return (data.length > 1 && data[0] !== "N");
    });
    let quantity = $("#question-quantity").val();
    if (quantity == "") {
        quantity = data.length;
    }
    const indexes = createIndexes(data.length);
    const randomIndexes = fisherYatesShuffle(indexes).slice(0, quantity);
    questions = randomIndexes.map(index => {
        return data[index];
    });

    return questions
}

exports.createIndexes = createIndexes
exports.fisherYatesShuffle = fisherYatesShuffle
exports.ruffleQuestions = ruffleQuestions