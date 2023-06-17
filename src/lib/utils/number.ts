export const ms = (x: number) => x * 1000
export const second = (x: number) => ms(x * 60)
export const hour = (x: number) => second(x * 60)
export const day = (x: number) => hour(x * 24)
