const permissions = {
  retrieve: {
    all: ["__v"],
    client: ["active"],
    client_manager: ["active"],
    consultant: ["active"],
    manager: ["active"],
    company_admin: ["active"],
    server_admin: [],
    superuser: []
  },
  update: {
    all: ["__v"],
    client: ["active"],
    client_manager: ["active"],
    consultant: ["active"],
    manager: ["active"],
    company_admin: ["active"],
    server_admin: [],
    superuser: []
  },
  create: {
    all: ["__v"],
    client: ["active"],
    client_manager: ["active"],
    consultant: ["active"],
    manager: ["active"],
    company_admin: ["active"],
    server_admin: [],
    superuser: []
  }
}

module.exports = permissions
