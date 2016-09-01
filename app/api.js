import superagent from 'superagent';
import config from '../config/config';

export default function api(params) {
  return new Promise((resolve, reject) => {
    const url = `http://${config.clientHost}:${config.clientPort}/api${params.url}`;
    const req = superagent[params.method](url);
    if (params) {
      req.send(params.data);
      req.type('application/json');
    }

    req.end((err, res) => {
      if (err || !res.body) {
        if (res.body && res.body.error) {
          return reject({
            error: res.body.error,
          });
        }
        return reject({
          error: err,
        });
      } else {
        return resolve({
          data: res.body.data,
        });
      }
    });
  });
}
