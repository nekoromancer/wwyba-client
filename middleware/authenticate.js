export default async function ({ app, $axios }) {
  let token = app.$cookies.get('jwt-token');

  if (!token) {
    try {
      const result = await $axios.get(`/tokens`);
      token = result.data.token;

      app.$cookies.set('jwt-token', token, {
        path: '/',
        maxAge: 60 * 60 * 23,
      });

      $axios.defaults.headers.common['authenticate'] = token;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  } else {
    $axios.defaults.headers.common['authenticate'] = token;
  }
};
