import R from 'ramda'

export type __ = typeof R.__

export type Head<T extends any[]> = T extends [any, ...any[]] ? T[0] : never

export type Tail<T extends any[]> = ((...t: T) => any) extends ((_: any, ...tail: infer TT ) => any) ? TT : []

export type HasTail<T extends any[]> = T extends ([] | [any]) ? false : true

export type Length<T extends any[]> = T['length']

export type Prepend<E, T extends any[]> = ((head: E, ...args: T) => any) extends ((...args: infer U) => any)
   ? U
   : T

export type Pos<I extends any[]> = Length<I>

export type Next<I extends any[]> = Prepend<any, I>

export type Prev<I extends any[]> = Tail<I>

export type Iterator<Index extends number = 0, From extends any[] = [], I extends any[] = []> = {
  0: Iterator<Index, Next<From>, Next<I>>
  1: From
}[
   Pos<I> extends Index
      ? 1
      : 0
   ]

type Reverse<T extends any[], R extends any[] = [], I extends any[] = []> = {
  0: Reverse<T, Prepend<T[Pos<I>], R>, Next<I>>
  1: R
} [
   Pos<I> extends Length<T>
      ? 1
      : 0
   ]

export type Concat<T1 extends any[], T2 extends any[]> =
   Reverse<Reverse<T1> extends infer R ? Cast<R, any[]> : never, T2>

export type Append<E, T extends any[]> = Concat<T, [E]>

export type GapOf<T1 extends any[], T2 extends any[], TN extends any[], I extends any[]> =
   T1[Pos<I>] extends __
      ? Append<T2[Pos<I>], TN>
      : TN

type GapsOf<T1 extends any[], T2 extends any[], TN extends any[] = [], I extends any[] = []> = {
  0: GapsOf<T1, T2, GapOf<T1, T2, TN, I> extends infer G ? Cast<G, any[]> : never, Next<I>>
  1: Concat<TN, Drop<Pos<I>, T2> extends infer D ? Cast<D, any[]> : never>
}[
   Pos<I> extends Length<T1>
      ? 1
      : 0
   ]

export type PartialGaps<T extends any[]> = {
  [K in keyof T]?: T[K] | __
}

export type CleanedGaps<T extends any[]> = {
  [K in keyof T]: NonNullable<T[K]>
}

export type Gaps<T extends any[]> = CleanedGaps<PartialGaps<T>>

export type Drop <N extends number, T extends any[], I extends any[] = []> = {
  0: Drop<N, Tail<T>, Prepend<any, I>>
  1: T
}[
   Length<I> extends N
      ? 1
      : 0
   ]

export type Cast<X,Y> = X extends Y ? X : Y

export type Curry<F extends ((...args: any) => any)> =
   <T extends any[]>(...args: Cast<Cast<T, Gaps<Parameters<F>>>, any[]>) =>
      GapsOf<T, Parameters<F>> extends [any, ...any[]]
         ? Curry<(...args: GapsOf<T, Parameters<F>> extends infer G ? Cast<G, any[]> : never) => ReturnType<F>>
         : ReturnType<F>