const symbols = ["+", "-", "*", "/", "sqrt", "max"];

export function evaluateRPN(input: string): string {
    const splittedInput = input.split(" ")
    const stack: number[] = []

    if (splittedInput.length === 0) {
        return "Error: Input is empty";
    }
    if (splittedInput.length === 1) {
        return splittedInput.at[0].toString();
    }
    if (symbols.includes(splittedInput[0])) {
        return "Error: expecting to start with numbers"
    }

    for (const token of splittedInput) {
        if (!isNaN(Number(token))) {
            stack.push(Number(token))
        } else if (symbols.includes(token)) {
            const tmp = [...stack]
            switch (token) {
                case "+":
                    stack.push(Number(stack.pop()) + Number(stack.pop()));
                    break;
                case "-":
                    const number1 = Number(stack.pop())
                    const number2 = Number(stack.pop())
                    stack.push(number2 - number1);
                    break;
                case "*":
                    stack.push(Number(stack.pop()) * Number(stack.pop()));
                    break;
                case "/":
                    const number3 = Number(stack.pop())
                    const number4 = Number(stack.pop())
                    if (number3 === 0) return "Error: division by zero"
                    stack.push(number4 / number3);
                    break;
                case "sqrt":
                    if (tmp.length >= 2) "Error: sqrt need one number"
                    tmp.push(Math.sqrt(number1));
                    break;

                case "max":
                    stack.push(Math.max(...tmp));
                    break;
            }
        }
    }
    if (stack.length === 0) {
        return "Error: Input is empty"
    }
    return stack.at(0).toString();
}



// trouver le symbole
// effectuer l'opération sur les chiffres avant

/*
 * 123 123 + 43 -
 * split ["123", "123", "+", "43", "-"]
 * creer une array de int [123, 123]
 * effectuer l'operation 123 123 lorsque que l'on trouve le 1er symbole "+" => fonction findSymbol()
 * ajouter les deux precedents = ["246", "43", "-"]
 */

/*
 * 123 123 + 43 -
 * split ["123", "123", "+", "43", "-"]
 * trouver le 1er symbole "+" => fonction findSymbol()
 * ajouter les deux precedents = ["246", "43", "-"]
 */


