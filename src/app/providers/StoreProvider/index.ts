export { StoreProvider } from './ui/StoreProvider';
export { createReduxStore, AppStore } from './config/store';
// как исключение типы можно импортировать в ниже стоящие уровни
export type { AppDispatch } from './config/store';
export type { StateSchema } from './config/StateSchema';