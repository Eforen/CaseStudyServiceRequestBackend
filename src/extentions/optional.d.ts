/** This makes the specified property of the type optional */
type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;