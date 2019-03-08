const permissions = {
  retrieve: {
    all: ["__v"],
    client: [],
    consultant: [],
    manager: [],
    company_admin: [],
    server_admin: [],
    superuser: []
  },
  update: {
    all: ["__v", "order_number"],
    client: ["account", "invoice", "host", "consultant"],
    consultant: ["account", "host"],
    manager: ["host"],
    company_admin: ["host"],
    server_admin: [],
    superuser: []
  },
  create: {
    all: ["__v", "order_number"],
    client: ["account", "invoice", "host", "consultant"],
    consultant: ["account", "host"],
    manager: ["host"],
    company_admin: ["host"],
    server_admin: [],
    superuser: []
  }
}

module.exports = permissions
