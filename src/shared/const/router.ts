export enum AppRoutes {
    MAIN = 'main',
    STORE = 'store',
    RESERVATION = 'reservation',
    // всегда последний
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.RESERVATION]: '/reservation',
    [AppRoutes.STORE]: '/store',
    [AppRoutes.NOT_FOUND]: '*'
}