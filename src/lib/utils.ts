import { PUBLIC_GOOGLE_WEB_FONTS_API_KEY } from "$env/static/public";
import { kebabCase } from "lodash-es";

export const createGoogleFontUrl = (font: GoogleWebFont) => {
    const variant = font.variants.find(variant => variant === 'regular');
    const url = [];

    if (!variant) {
        throw new Error('Only fonts with regular variants are supported!');
    }

    url.push('https://fonts.googleapis.com/css?family=');
    url.push(font.family);
    url.push('&display=swap');

    return url.join('').replaceAll(' ', '+');
}

export const getAvailableFonts = async () => {
    const request = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${PUBLIC_GOOGLE_WEB_FONTS_API_KEY}`);
    const json = await request.json() as GoogleWebFontsResponse;

    // Only regular fonts allowed
    return json.items.filter(font => font.variants.includes('regular'));
}

export const loadFont = async (name: string, url: string) => {
    const fonts = [...document.fonts.values()];

    if (fonts.find(font => font.family === name)) {
        console.log('font already exists');
        return;
    }

    const font = new FontFace(name, url);
    await font.load();

    // Skip fonts that failed loading
    if (!font.loaded) {
        return;
    }

    document.fonts.add(font);
}

export const objToCssString = (obj: Partial<CSSStyleDeclaration>) => {
    // @ts-ignore
    return Object.keys(obj).map(key => `${kebabCase(key)}: ${obj[key]}`).join(';') + ';';
}

export function formDataToObject(formData = new FormData(), options?: FormDataToObjectOptions): NestedObject {
    const { parentKey } = options ?? { parentKey: "" };
    const result: any = {};
    const entries = formData.entries();

    for (const [key, value] of entries) {
        const currentKey = parentKey ? `${parentKey}.${key}` : key;
        const chunks = currentKey.split(".");
        let current = result;

        const parsedValue = (() => {
            if (value === '') return '';
            if (value === "false") return false;
            if (value === "true") return true;
            if (!isNaN(Number(value))) return Number(value);
            return value;
        })();

        const chunksLen = chunks.length;
        for (let chunkIdx = 0; chunkIdx < chunksLen; chunkIdx++) {
            const chunkName = chunks[chunkIdx];
            const isArray = chunkName.endsWith("]");

            if (isArray) {
                const indexStart = chunkName.indexOf("[");
                const indexEnd = chunkName.indexOf("]");

                const arrayIndex = parseInt(
                    chunkName.substring(indexStart + 1, indexEnd)
                );

                if (isNaN(arrayIndex)) {
                    throw new Error(
                        "wrong form data - cannot retrieve array index " + arrayIndex
                    );
                }

                const actualChunkName = chunkName.substring(0, indexStart);
                current[actualChunkName] = current[actualChunkName] ?? [];

                if (chunkIdx === chunks.length - 1) {
                    current[actualChunkName][arrayIndex] = parsedValue;
                } else {
                    current[actualChunkName][arrayIndex] =
                        current[actualChunkName][arrayIndex] ?? {};
                    current = current[actualChunkName][arrayIndex];
                }
            } else {
                if (chunkIdx === chunks.length - 1) {
                    current[chunkName] = parsedValue;
                } else {
                    current[chunkName] = current[chunkName] ?? {};
                    current = current[chunkName];
                }
            }
        }
    }

    return result;
}