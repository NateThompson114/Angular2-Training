function add(n1: number, n2: number, showResult: boolean, resultPhrase: string) {
    if (showResult) {
        console.log(resultPhrase + `${n1 + n2}`);
    } else {
        return n1+ n2
    }

    return n1 + n2;
}

const number1 = 5;
const number2 = 2.8;
const printeResult = true;
const resultPhrase = 'Result is: '

add(number1, number2, printeResult, resultPhrase);
