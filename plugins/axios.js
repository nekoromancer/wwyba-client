export default function ({app, $axios, store}) {
  $axios.onRequest(config => {
    const env = app.context.env;
    const token = app.$cookies.get('jwt-token');

    config.baseURL = `${env.BASE_URL}/${env.STAGE}`;
    if (token) {
      config.headers.common['authenticate'] = token;
    }

    if (process.client) {
      store.commit('spinner/active');
    }
  });

  $axios.onResponse(config => {
    if (process.client) {
      store.commit('spinner/inactive');
    }
  });

  $axios.onError(config => {
    if (process.client) {
      store.commit('spinner/inactive');
    }
  });
}
