export const sortArray = (array, direction = 'asc' || 'desc', propName, propType) => {
    let sortCallback = null;
    if (propType === 'number' || propType === 'pureNumber') {

        sortCallback = function (a, b) {
            let firstNumber = propType === 'pureNumber' ? a[propName] : parseFloat(a[propName].replace(/,/g, '').replace('M', ''));
            let secondNumber = propType === 'pureNumber' ? b[propName] : parseFloat(b[propName].replace(/,/g, '').replace('M', ''));
            return direction === 'asc' ? firstNumber - secondNumber : secondNumber - firstNumber;
        }
    }

    else {
        sortCallback = function (a, b) {
            var x = a[propName].toLowerCase();
            var y = b[propName].toLowerCase();
            if (direction === 'asc' && x < y) { return -1; }
            if (direction === 'desc' && x < y) { return 1; }
            if (direction === 'asc' && x > y) { return 1; }
            return 0;
        }
    }

    return [...array].sort(sortCallback)
}