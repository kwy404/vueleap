// Plain objects that only look a little like Vue code: no findings expected.
export const state = { destroyed: true, data: {} }
export const route = { path: '/', props: true }
export const binder = { bind(target) { return target } }
export const emitter = { on() {}, off() {} }
export const flag = a | b
