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
    all: ["__v", "username"],
    client: ["host", "activaton", "reset", "password", "csrf_hash", "company", "processing_company", "people", "order", "invoice", "role"],
    client_manager: ["host", "activaton", "reset", "password", "csrf_hash", "company", "processing_company", "people", "order", "invoice", "role"],
    consultant: ["host", "activaton", "reset", "password", "csrf_hash", "company", "processing_company", "order", "invoice", "role"],
    manager: ["host", "activaton", "reset", "password", "csrf_hash", "company", "processing_company", "order", "invoice", "role"],
    company_admin: ["host", "activaton", "reset", "password", "csrf_hash", "company", "processing_company", "order", "invoice"],
    server_admin: ["host", "activaton", "reset", "password", "csrf_hash", "company", "processing_company", "order", "invoice"],
    superuser: []
  },
  create: {
    all: ["__v", "username"],
    client: ["host", "activaton", "reset", "password", "csrf_hash", "company", "processing_company", "people", "order", "invoice", "role"],
    client_manager: ["host", "activaton", "reset", "password", "csrf_hash", "company", "processing_company", "people", "order", "invoice", "role"],
    consultant: ["host", "activaton", "reset", "password", "csrf_hash", "company", "processing_company", "order", "invoice", "role"],
    manager: ["host", "activaton", "reset", "password", "csrf_hash", "company", "processing_company", "order", "invoice", "role"],
    company_admin: ["host", "activaton", "reset", "password", "csrf_hash", "company", "processing_company", "order", "invoice"],
    server_admin: ["host", "activaton", "reset", "password", "csrf_hash", "company", "processing_company", "order", "invoice"],
    superuser: []
  }
}

module.exports = permissions
