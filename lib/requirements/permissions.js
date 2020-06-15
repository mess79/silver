const permissions = {
  retrieve: {
    all: ["__v"],
    client: ["_id", "country_to", "country_from", "category", "active"],
    client_manager: ["_id", "country_to", "country_from", "category", "active"],
    consultant: ["_id", "country_to", "country_from", "category", "active"],
    manager: ["_id", "country_to", "country_from", "category", "active"],
    company_admin: ["_id", "country_to", "country_from", "category", "active"],
    server_admin: [],
    superuser: []
  },
  update: {
    all: ["__v"],
    client: ["_id", "country_to", "country_from", "category", "active"],
    client_manager: ["_id", "country_to", "country_from", "category", "active"],
    consultant: ["_id", "country_to", "country_from", "category", "active"],
    manager: ["_id", "country_to", "country_from", "category", "active"],
    company_admin: ["_id", "country_to", "country_from", "category", "active"],
    server_admin: [],
    superuser: []
  },
  create: {
    all: ["__v"],
    client: ["_id", "country_to", "country_from", "category", "active"],
    client_manager: ["_id", "country_to", "country_from", "category", "active"],
    consultant: ["_id", "country_to", "country_from", "category", "active"],
    manager: ["_id", "country_to", "country_from", "category", "active"],
    company_admin: ["_id", "country_to", "country_from", "category", "active"],
    server_admin: [],
    superuser: []
  }
}

module.exports = permissions
