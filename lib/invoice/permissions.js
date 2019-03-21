const permissions = {
  retrieve: {
    all: ["__v"],
    client: [],
    client_manager: [],
    consultant: [],
    manager: [],
    company_admin: [],
    server_admin: [],
    superuser: []
  },
  update: {
    all: ["__v", "invoice_number"],
    client: ["account", "closed", "processing_company", "order", "host", "consultant"],
    client_manager: ["account", "closed", "processing_company", "order", "host", "consultant"],
    consultant: ["account", "processing_company", "host"],
    manager: ["host"],
    company_admin: ["host"],
    server_admin: [],
    superuser: []
  },
  create: {
    all: ["__v", "invoice_number"],
    client: ["account", "closed", "processing_company", "order", "host", "consultant"],
    client_manager: ["account", "closed", "processing_company", "order", "host", "consultant"],
    consultant: ["account", "processing_company", "host"],
    manager: ["host"],
    company_admin: ["host"],
    server_admin: [],
    superuser: []
  }
}

module.exports = permissions
