import { decode, encode } from '../src';

const mocks = {
  secret: 'secret',
  payload: {
    foo: 'bar',
  },
};

type MockPayload = {
  foo: string;
};

test('can encode token', () => {
  const token = encode(mocks.payload, { secret: mocks.secret });

  expect(typeof token === 'string').toBeTruthy();
});

test('can encode token with empty payload', () => {
  const token = encode({}, { secret: mocks.secret });

  expect(typeof token === 'string').toBeTruthy();
});

test('can decode token with payload', () => {
  const token = encode(mocks.payload, { secret: mocks.secret });
  const payload = decode<MockPayload>(token, mocks.secret);

  expect(payload.foo).toBe('bar');
});

test('can encode and decode token with expires', () => {
  const token = encode({}, { secret: mocks.secret, expiresIn: '10s' });
  const payload = decode(token, mocks.secret);

  expect(typeof payload.exp === 'number').toBeTruthy();
});

test('can encode and decode token with expires and payload', () => {
  const token = encode(mocks.payload, {
    secret: mocks.secret,
    expiresIn: '1s',
  });
  const payload = decode<MockPayload>(token, mocks.secret);

  expect(payload.foo).toBe('bar');
  expect(typeof payload.exp === 'number').toBeTruthy();
});

test('expries working with generated token', async () => {
  expect.assertions(1);

  const token = encode({}, { secret: mocks.secret, expiresIn: '1s' });

  try {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const payload = decode(token, mocks.secret);
          resolve(payload);
        } catch (e) {
          reject(e);
        }
      }, 1500);
    });
  } catch (e) {
    if (!(e instanceof Error)) return;

    expect(e.message).toMatch('Token expired');
  }
}, 6000);
