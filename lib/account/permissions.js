const permissions = {
  retrieve: {
    all: ["__v"],
    client: ["role"],
    consultant: ["role"],
    manager: ["role"],
    company_admin: [],
    server_admin: [],
    superuser: []
  },
  update: {
    all: ["__v", "username", "role"],
    client: ["host", "activaton", "reset", "password", "csrf_hash", "company", "processing_company", "people", "order", "invoice"],
    client_manager: ["host", "activaton", "reset", "password", "csrf_hash", "company", "processing_company", "people", "order", "invoice"],
    consultant: ["host", "activaton", "reset", "password", "csrf_hash", "company", "processing_company", "order", "invoice"],
    manager: ["host", "activaton", "reset", "password", "csrf_hash", "company", "processing_company", "order", "invoice"],
    company_admin: ["host", "activaton", "reset", "password", "csrf_hash", "company", "processing_company", "order", "invoice"],
    server_admin: ["host", "activaton", "reset", "password", "csrf_hash", "company", "processing_company", "order", "invoice"],
    superuser: []
  },
  create: {
    all: ["__v", "username", "role"],
    client: ["host", "activaton", "reset", "password", "csrf_hash", "company", "processing_company", "people", "order", "invoice"],
    client_manager: ["host", "activaton", "reset", "password", "csrf_hash", "company", "processing_company", "people", "order", "invoice"],
    consultant: ["host", "activaton", "reset", "password", "csrf_hash", "company", "processing_company", "order", "invoice"],
    manager: ["host", "activaton", "reset", "password", "csrf_hash", "company", "processing_company", "order", "invoice"],
    company_admin: ["host", "activaton", "reset", "password", "csrf_hash", "company", "processing_company", "order", "invoice"],
    server_admin: ["host", "activaton", "reset", "password", "csrf_hash", "company", "processing_company", "order", "invoice"],
    superuser: []
  }
}

module.exports = permissions
