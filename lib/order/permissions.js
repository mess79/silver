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
    client: ["account", "active", "closed", "processing_company", "invoice", "host"],
    consultant: ["account", "processing_company", "host"],
    manager: ["host"],
    company_admin: ["host"],
    server_admin: [],
    superuser: []
  },
  create: {
    all: ["__v", "order_number"],
    client: ["account", "active", "closed", "processing_company", "invoice", "host"],
    consultant: ["account", "processing_company", "host"],
    manager: ["host"],
    company_admin: ["host"],
    server_admin: [],
    superuser: []
  }
}

module.exports = permissions
