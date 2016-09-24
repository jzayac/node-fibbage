import superagent from 'superagent';
import config from '../../../config/config';
// import querystring from 'querystring';

export default function middleware({ getState }) {
  return (next) => {
    return (action) => {
      if (!action.types) {
        next(action);
        return;
      }

      const [PENDING, FULFILLED, REJECTED] = action.types;

      const state = getState();
      const params = { ...action.params };

      if (action.fields) {
        action.fields.forEach(field => {
          if (state.news[field]) {
            params[field] = state.news[field];
          }
        });
      }

      next({
        type: PENDING,
        params,
      });

      return new Promise((resolve, reject) => {
        const url = `http://${config.clientHost}:${config.clientPort}/api${params.url}`;
        const req =
          superagent[params.method](url);
        if (params.data) {
          req.send(params.data);
          req.type('application/json');
          // req.type('form');
        }
        req.end((err, res) => {
          if (err) {
            if (!res) {
              return reject({
                data: {
                  message: ['connection error', err],
                },
              });
            }
          // if (err || !res.body) {
            if (res.body && res.body.error) {
              return reject({
                data: {
                  message: res.body.error,
                },
              });
            } else {
              return reject({
                data: err,
              });
            }
          } else {
            return resolve({
              data: res.body.data,
            });
          }
        });
      }).then(
        (data) => next({ data: data.data, type: FULFILLED }),
        (err) => {
          next({ error: err.data.message, type: REJECTED });
        }
      ).catch((err) => {
        next({ err, type: REJECTED });
      });
    };
  };
}
