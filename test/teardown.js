describe('teardown', () => {
  it('should gracefully close the server', done => {
    server.close()
    done()
  })
})
