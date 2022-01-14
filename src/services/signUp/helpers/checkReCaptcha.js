import https from 'https';
import querystring from 'querystring';

const requestPromise = async (url) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': 0
    }
  };
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, res => {
      let body = '';
      res.on('data', chunk => { body += chunk.toString() })
      res.on('error', reject);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode <= 299) {
          resolve({ statusCode: res.statusCode, headers: res.headers, body: body });
        } else {
          reject('Request failed. status: ' + res.statusCode + ', body: ' + body);
        }
      });
    });
    req.on('error', reject);
    req.write("");
    req.end();
  });
}

export const checkReCaptcha = async (token) => {
  console.log(`g-recaptcha-response => ${token}`);
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  const parameters = querystring.stringify({
    secret: secretKey,
    response: token
  });
  const url = `https://www.google.com/recaptcha/api/siteverify?${parameters}`;
  const result = await requestPromise(url);
  console.log(`reCAPTCHA response: ${result.body}`);
  const response = JSON.parse(result.body);
  return response.success;
}
