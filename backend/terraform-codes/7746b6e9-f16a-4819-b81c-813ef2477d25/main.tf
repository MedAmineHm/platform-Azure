provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "resource-group" {
    name     = "Resource"
    location = "East US"
}


resource "azurerm_virtual_network" "virtual_network" {
  name                = "vnet-kube"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.resource-group.location
  resource_group_name = azurerm_resource_group.resource-group.name
}


resource "azurerm_subnet" "virtual_network" {
  name                 = "vnet-kube"
  address_prefixes     = ["10.0.2.0/24"]
  resource_group_name  = azurerm_resource_group.resource-group.name
  virtual_network_name = azurerm_virtual_network.virtual_network.name
}


resource "azurerm_public_ip" "public-ip" {
  name                = "Public Ip"
  location            = azurerm_resource_group.resource-group.location
  resource_group_name = azurerm_resource_group.resource-group.name
  allocation_method   = "Dynamic"
}


resource "azurerm_network_interface" "network-interface" {
  name                = "example-nic"
  location            = azurerm_resource_group.resource-group.location
  resource_group_name = azurerm_resource_group.resource-group.name

  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.virtual_network.id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id          = azurerm_public_ip.public-ip.id
  }
}



resource "azurerm_linux_virtual_machine" "VM" {
  name                = "Virtual Machine"
  location            = azurerm_resource_group.resource-group.location
  resource_group_name = azurerm_resource_group.resource-group.name
  size                = "Standard_B1s"
  admin_username      = "adminuser"

  network_interface_ids = [
    azurerm_network_interface.network-interface.id,
  ]

  admin_ssh_key {
    username   = "adminuser"
    public_key = file("~/.ssh/id_rsa.pub")
  }

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }
}

