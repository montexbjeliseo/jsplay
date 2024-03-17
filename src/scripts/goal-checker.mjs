const outputElement = document.querySelector(".console");

if (!outputElement) {
    throw new Error('No se encontro el elemento de consola');
}

export function consoleIs(codeFragment) {
    return outputElement?.textContent?.trim() === codeFragment;
}

export function consoleContains(codeFragment) {
    return outputElement?.textContent?.trim().includes(codeFragment);
}

function getEditorContent() {
    const cmContent = document.querySelector(".cm-content");

    if (!cmContent) {
        throw new Error('No se encontro el elemento del editor');
    }

    return cmContent;
}

// Requires lazy load cmContent
export function editorContains(codeFragment) {
    return getEditorContent().textContent?.includes(codeFragment);
}

export function editorContainsIgnoringSpaces(codeFragment){
    return getEditorContent().textContent?.replace(/\s/g, '').includes(codeFragment.replace(/\s/g, ''));
}

export function definesVariable(description){
    const code = getEditorContent().textContent;
    const regex = new RegExp(`${description.type}\\s+${description.name}\\s*=\\s*${description.value ? `['"]${description.value}['"]` : '\\w+'}`);
        return regex.test(code);
}

export function variablePrinted(description) {
    const output = outputElement.textContent;
    const code = getEditorContent().textContent;

    const variableName = description.name.charAt(0).toUpperCase() + description.name.slice(1);

    const regexCode = new RegExp(`console\\.log\\(\\s*("|')${variableName}\\s*:\\s*\\1\\s*,\\s*${description.name}\\s*\\)`);

    const regexOutput = new RegExp(`\\b${variableName}:\\s*${description.value}`);

    console.log(regexCode.test(code), regexOutput.test(output));

    return regexCode.test(code) && regexOutput.test(output);
}
