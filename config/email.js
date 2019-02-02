const emailConfig = {
  message: {
    from: 'mess79@gmail.com'
  },
  // uncomment below to send emails in development/test env:
  send: true,
  preview: false,
  transport: {
    jsonTransport: true
  }
}

module.exports = emailConfig
