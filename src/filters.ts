export interface FilterUsage {
  /** Filter name, for example `currency` in `price | currency('EUR')`. */
  name: string
  /** Offset of the `|` character inside the expression. */
  offset: number
}

const VALID_DIVISION_CHAR = /[\w).+\-_$\]]/

/**
 * Finds Vue 2 filters in a template expression. Follows the same scanning
 * rules as the Vue 2 template compiler: a single `|` outside of strings,
 * regular expressions, brackets and parentheses starts a filter.
 */
export function findFilters(expression: string): FilterUsage[] {
  const pipes: number[] = []
  let inSingle = false
  let inDouble = false
  let inTemplate = false
  let inRegex = false
  let curly = 0
  let square = 0
  let paren = 0
  let c = 0
  let prev = 0

  for (let i = 0; i < expression.length; i++) {
    prev = c
    c = expression.charCodeAt(i)
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5c) inSingle = false
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5c) inDouble = false
    } else if (inTemplate) {
      if (c === 0x60 && prev !== 0x5c) inTemplate = false
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5c) inRegex = false
    } else if (
      c === 0x7c &&
      expression.charCodeAt(i + 1) !== 0x7c &&
      expression.charCodeAt(i - 1) !== 0x7c &&
      curly === 0 &&
      square === 0 &&
      paren === 0
    ) {
      pipes.push(i)
    } else {
      switch (c) {
        case 0x22:
          inDouble = true
          break
        case 0x27:
          inSingle = true
          break
        case 0x60:
          inTemplate = true
          break
        case 0x28:
          paren++
          break
        case 0x29:
          paren--
          break
        case 0x5b:
          square++
          break
        case 0x5d:
          square--
          break
        case 0x7b:
          curly++
          break
        case 0x7d:
          curly--
          break
      }
      if (c === 0x2f) {
        let j = i - 1
        let p = ''
        for (; j >= 0; j--) {
          p = expression.charAt(j)
          if (p !== ' ') break
        }
        if (!p || !VALID_DIVISION_CHAR.test(p)) inRegex = true
      }
    }
  }

  return pipes.map((offset, index) => {
    const end = index + 1 < pipes.length ? pipes[index + 1] : expression.length
    const segment = expression.slice(offset + 1, end).trim()
    const paren = segment.indexOf('(')
    const name = (paren === -1 ? segment : segment.slice(0, paren)).trim()
    return { name, offset }
  })
}
