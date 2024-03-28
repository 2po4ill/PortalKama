import turtle from "shared/assets/images/turtle.jpg";

export const imageSrc = (src: string): string => {
    const staticImages: Record<string, string> = {
        "/image/turtle.jpg": turtle
    }

    if (/api/.test(src)) {
        return "";
    }

    if (/image/.test(src)) {
        return staticImages[src];
    }

    return src;
}