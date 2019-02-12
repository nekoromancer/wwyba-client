export default ({app}) => {
  if (process.env.NODE_ENV !== 'production') return false;

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', process.env.GTAG_ID);

  app.router.afterEach((to, from) => {
    gtag('event', 'pageView', {
      event_label: to.fullPath,
    });
  })
}
