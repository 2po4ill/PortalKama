declare module '*.scss' {
    interface IClassNames {
        [className: string]: string
    }
    const classNames: IClassNames;
    export = classNames;
}

declare module "*.svg" {
    import React from "react";
    const SVG: React.FC<React.SVGProps<SVGSVGElement>>
    export default SVG
}

declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.webp";

// true, если проект запущен в Dev моде
declare const __IS_DEV__: boolean;

// константа apiURL, задается при сборке
declare const __API__: string;