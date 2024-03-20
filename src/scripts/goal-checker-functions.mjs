const outputElement = document.querySelector(".console");

if (!outputElement) {
    throw new Error('No se encontro el elemento de consola');
}

export function consoleIs(codeFragment) {
    return outputElement?.textContent?.trim() === codeFragment;
}

function getEditorContent() {
    const cmContent = document.querySelector(".cm-content");

    if (!cmContent) {
        throw new Error('No se encontro el elemento del editor');
    }

    return cmContent;
}

export function escape(text){
    return typeof text === "string" ? `("|')${text}\\1` : text;
}

/**
 * Check if variable is defined
 * @param {Object} description
 * @param {string} description.type
 * @param {string} description.name
 * @param {string || number} description.value
 * @return {boolean}
 */
export function definesVariable(description){
    const code = getEditorContent().textContent;

    const regex = new RegExp(`${description.type}\\s+${description.name}\\s*=\\s*${description.value ? `${escape(description.value)}` : '\\w+'}`);
        return regex.test(code);
}

export function definesAndReassignsVariable(description, newValue) {
    const code = getEditorContent().textContent;
    const regex = new RegExp(`${description.name}\\s*=\\s*${escape(newValue)}`);
    return regex.test(code) && definesVariable(description);
}

export function variablePrinted(description) {

    console.log("vprint: ", description)

    const output = outputElement.textContent;
    const code = getEditorContent().textContent;
    
    const regexCode = new RegExp(`console\\.log\\(.*\\s*${description.name}\\s*\\)`);

    const regexOutput = new RegExp(`.*\\s*${description.value}`);

    return regexCode.test(code) && regexOutput.test(output);
}

export function printsTypeof(description) {
    const output = outputElement.textContent;
    const code = getEditorContent().textContent;

    console.log({
        output,
        code,
        regexCode: new RegExp(`console\\.log\\(.*\\s*typeof\\s*${description.name}\\s*\\)`),
        regexOutput: new RegExp(`.*\\s*${typeof description.value}`),
        test: new RegExp(`console\\.log\\(.*\\s*typeof\\s*${description.name}\\s*\\)`).test(code) && new RegExp(`.*\\s*${typeof description.value}`).test(output),
        type: typeof description.value,
        name: description.name
    })
    
    const regexCode = new RegExp(`console\\.log\\(.*\\s*typeof\\s*${description.name}\\s*\\)`);

    const regexOutput = new RegExp(`.*\\s*${typeof description.value}`);

    return regexCode.test(code) && regexOutput.test(output);

}
