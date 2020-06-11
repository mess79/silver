const permissions = {
  retrieve: {
    all: ["__v"],
    client: ["_id", "country_to", "country_from", "category"],
    client_manager: ["_id", "country_to", "country_from", "category"],
    consultant: ["_id", "country_to", "country_from", "category"],
    manager: ["_id", "country_to", "country_from", "category"],
    company_admin: ["_id", "country_to", "country_from", "category"],
    server_admin: [],
    superuser: []
  },
  update: {
    all: ["__v"],
    client: ["_id", "country_to", "country_from", "category"],
    client_manager: ["_id", "country_to", "country_from", "category"],
    consultant: ["_id", "country_to", "country_from", "category"],
    manager: ["_id", "country_to", "country_from", "category"],
    company_admin: ["_id", "country_to", "country_from", "category"],
    server_admin: [],
    superuser: []
  },
  create: {
    all: ["__v"],
    client: ["_id", "country_to", "country_from", "category"],
    client_manager: ["_id", "country_to", "country_from", "category"],
    consultant: ["_id", "country_to", "country_from", "category"],
    manager: ["_id", "country_to", "country_from", "category"],
    company_admin: ["_id", "country_to", "country_from", "category"],
    server_admin: [],
    superuser: []
  }
}

module.exports = permissions
