
# Authentication with Managed Identity

Both [PostgreSQL Single Server](https://learn.microsoft.com/en-us/azure/postgresql/single-server/overview-single-server) and [PostgreSQL Flexible Server](https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/overview) offer Authentication via Entra ID (Formally Active Directory). 

Using the below Terraform, you create the following resources:
- Entra ID Application
	- Service Principal / Managed Identity
	- ARM Role Assignment (For Subscription Access)
- PostgreSQL Flexible Server (With Entra ID Authentication Enabled)
- A PostgreSQL Flexible Server Active Directory / Entra ID Administrator

```terraform
resource "azuread_application" "application" {  
  display_name = "PostgreSQL"  
}  
  
resource "azuread_service_principal" "principal" {  
  application_id = azuread_application.application.application_id  
  
  depends_on = [azuread_application.application]  
}  
  
data "azuread_client_config" "config" {}  
  
data "azurerm_subscription" "subscription" {}  
  
resource "azurerm_role_assignment" "contributor" {  
  principal_id         = azuread_service_principal.principal.id  
  scope                = data.azurerm_subscription.subscription.id  
  role_definition_name = "Contributor"  
}  
  
resource "azurerm_postgresql_flexible_server" "test" {  
  location            = var.location  
  name                = "psql-managed-identity"  
  resource_group_name = var.resource_group_name  
  
  sku_name = "B_Standard_B1ms"  
  
  version = "15"  
  
  storage_mb = 65536  
  
  zone = "1"  
  
  authentication {  
    active_directory_auth_enabled = true  
    password_auth_enabled         = false  
    tenant_id                     = data.azuread_client_config.config.tenant_id  
  }  
  
  depends_on = [azuread_service_principal.principal]  
  
}  
  
resource "azurerm_postgresql_flexible_server_active_directory_administrator" "administrator" {  
  object_id           = azuread_service_principal.principal.object_id  
  principal_name      = azuread_service_principal.principal.display_name  
  principal_type      = "ServicePrincipal"  
  resource_group_name = var.resource_group_name  
  server_name         = azurerm_postgresql_flexible_server.test.name  
  tenant_id           = data.azuread_client_config.config.tenant_id  
  
  depends_on = [azurerm_postgresql_flexible_server.test]  
}
```