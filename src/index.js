async function asyncDelay(milliseconds, options = {}) {
  if (typeof milliseconds !== 'number' || milliseconds < 0) {
    throw new TypeError('milliseconds harus berupa angka non-negatif')
  }
  const { returnValue, abortSignal } = options
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => resolve(returnValue), milliseconds)
    if (abortSignal) {
      abortSignal.addEventListener(
        'abort',
        () => {
          clearTimeout(timer)
          reject(new Error('Delay dibatalkan'))
        },
        { once: true }
      )
    }
  })
}

function cancelDelay(promise, controller) {
  if (!controller) {
    throw new Error('AbortController diperlukan untuk membatalkan delay')
  }
  controller.abort()
}

async function scheduleTask(task, milliseconds) {
  if (typeof task !== 'function') {
    throw new TypeError('task harus berupa fungsi')
  }
  await asyncDelay(milliseconds)
  return task()
}

export const waitly = Object.assign(asyncDelay, {
  cancelDelay,
  scheduleTask,
})
