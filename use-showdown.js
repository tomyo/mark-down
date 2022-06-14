import {showdownScript} from './vendor/showdown.js'

let converter;
let convert;

/**
 * Markdown converter using showdown.
 * Check options at https://github.com/showdownjs/showdown#setting-options
 * 
 * @returns [converter, convert: (md) => html]
 */
export function useShowdown(options = {
    'metadata': 'true',
    'smartIndentationFix': 'true',
}) {
    if (converter && convert) {
        return [converter, convert];
    }

    const showdown = new showdownScript().showdown;
    showdown.setFlavor('github');

    converter = new showdown.Converter(options);
    convert = (md) => converter.makeHtml(md);

    return [converter, convert]
}
