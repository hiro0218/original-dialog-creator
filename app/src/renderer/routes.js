export default [
  {
    path: '/',
    name: 'generator-page',
    component: require('components/GeneratorView')
  },
  {
    path: '*',
    redirect: '/'
  }
]
