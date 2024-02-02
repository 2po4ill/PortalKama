export enum AppRoutes {
    MAIN = 'main',
    SHOP = 'shop',
    RESERVATION = 'reservation',
    PROFILE = 'profile',
    // всегда последний
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.RESERVATION]: '/reservation',
    [AppRoutes.SHOP]: '/shop',
    [AppRoutes.PROFILE]: '/profile',
    [AppRoutes.NOT_FOUND]: '*'
}