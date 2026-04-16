const url = 'http://localhost:4000/api/contact';
const body = {
  name: 'Test User',
  email: 'test@example.com',
  phone: '000',
  message: 'SMTP validation test',
};

try {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  console.log('status', res.status);
  const text = await res.text();
  console.log(text);
} catch (err) {
  console.error(err);
  process.exit(1);
}
