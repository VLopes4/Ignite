import { Either, left, right } from "./either"

function doSomethin(shouldSucess: boolean): Either<string, number> {
  if (shouldSucess) {
    return right(10)
  } else {
    return left('error')
  }
}

test('success result', () => {
  const result = doSomethin(true)

  expect(result.isRight()).toBe(true)
  expect(result.isLeft()).toBe(false)
})

test('error result', () => {
  const result = doSomethin(false)

  expect(result.isLeft()).toBe(true)
  expect(result.isRight()).toBe(false)
})