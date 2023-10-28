import ky from 'ky'

const api = ky.create({
  prefixUrl: '/api',
  hooks: {
    beforeRequest: [
      request => request.headers.set('Authorization', localStorage.getItem('bug-tracker:token') ?? '')
    ]
  }
})

export default api
