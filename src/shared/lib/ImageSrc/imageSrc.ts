import turtle from "shared/assets/images/turtle.jpg";
import placeholder from "shared/assets/placeholder-image.webp";

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

    if (src === "") {
        return placeholder;
    }

    return src;
}