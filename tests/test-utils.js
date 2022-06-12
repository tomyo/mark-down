export function assert(expr, extraInfo = '') {
  if (!!expr !== true) {
    throw new Error(`assert: ${extraInfo}`);
  }
}

export function assertTrue(expr, extraInfo = '') {
  if (expr !== true) {
    const msg = extraInfo ? extraInfo : `Given expression (${expr}) doesn't evaluate to true.`
    throw new Error(`assertTrue: ${msg}`);
  }
}

export function assertEqual(exprA, exprB, extraInfo = '') {
  if (exprA !== exprB) {
    throw new Error(`assertEqual: ${extraInfo}\n\n${exprA}\n\n!==\n\n${exprB}`);
  }
}


/* 
* Returns fun() if resolves into a truthly value within given time. 
* Throws otherwise.
* 
* Given time: checkIntervalTime * retries. 
*/
export async function waitFor(fun, checkIntervalTime = 200, retries = 10) {
  if (typeof fun !== 'function') {
    throw new Error('waitFor only accepts functions as argument')
  }

  return new Promise((resolve, _) => {
    if (!!fun()) {
      return resolve(fun());
    }

    function check() {
      if (!!fun()) {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
        return resolve(fun());
      }
    }

    const intervalId = setInterval(check, checkIntervalTime);

    const timeToGiveUpRetrying = checkIntervalTime * retries + Math.ceil(checkIntervalTime * 0.1);
    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
      throw new Error(`timeout on waitFor(${fun})`);
    }, timeToGiveUpRetrying);
  });
}



/* 
* Executes all given object's functions (values).
* 
* Report will be shown in console, and sent to BroadcastChannel('tests').
* If a test fails, error is thrown.
*/
export async function runTests(tests = {}) {
  const broadcast = new BroadcastChannel('tests');

  const summary = [];
  for (const [name, test] of Object.entries(tests)) {

    try {
      await test();
      console.info(`✔ ${name}`);
      summary.push(`✔ ${name}`);
    } catch (error) {
      console.warn(`✘ ${name}`, error);
      summary.push(`✘ ${name}`);
      throw error;
    }
  }
  broadcast.postMessage(summary);
}
