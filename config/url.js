const urlConfig = {
  protocol : "http://"
}

if (process.env.NODE_ENV === 'production'){
  urlConfig.protocol = "https://"
}

module.exports = urlConfig
