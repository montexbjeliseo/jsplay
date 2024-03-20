export const a = (text, href) => {
    return `<a href="${href}">${text}</a>`
}

export const p = (text) => {
    return `<p>${text}</p>`
}

export const build = (tag, content, attributes) => {

    const attributeString = attributes && Object.entries(attributes).map(([key, value]) => `${key}="${value}"`).join(' ');

    return `<${tag} ${attributeString ? attributeString : ''}>${content}</${tag}>`;
}