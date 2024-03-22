// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SetAtom<Args extends any[], Result> = (...args: Args) => Result;

export type { SetAtom };
