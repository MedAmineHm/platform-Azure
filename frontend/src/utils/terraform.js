import { filter, find, forEach, includes } from "ramda";

export const processBoardResources = (nodes = [], edges = []) => {
  const locations = {};
  const resourceGroups = {};
  const vnets = {};
  const subnets = {};
  const publicIps = {};
  const networkInterfaces = {};
  const vms = {};
  const res = {};

  // process locations
  const locationsNodes = filter((node) => node.type === "LocationNode")(nodes);
  if (locationsNodes.length) {
    forEach((node) => (locations[node.id] = node.data.values))(locationsNodes);
  }

  // process resource groups
  const resourceGroupsNodes = filter(
    (node) => node.type === "ResourceGroupNode"
  )(nodes);

  if (resourceGroupsNodes.length) {
    forEach(
      (node) =>
        (resourceGroups[node.id] = {
          name: node.data.values.name,
          location: locations?.[node.parentId]?.location,
          resource_name: node.data.values.resourceName,
        })
    )(resourceGroupsNodes);
    res.resources = Object.values(resourceGroups);
  }

  // process vnets
  const vnetsNodes = filter((node) => node.type === "VnetNode")(nodes);
  if (vnetsNodes.length) {
    forEach(
      (node) =>
        (vnets[node.id] = {
          resource_name: node.data.values.resourceName,
          name: node.data.values.name,
          address_space: [node.data.values.addressSpace],
          location: `azurerm_resource_group.${
            resourceGroups?.[node.parentId]?.resource_name
          }.location`,
          resource_group_name: `azurerm_resource_group.${
            resourceGroups?.[node.parentId]?.resource_name
          }.name`,
        })
    )(vnetsNodes);
    res.vnets = Object.values(vnets);
  }

  // process subnets
  const subnetsNodes = filter((node) => node.type === "SubnetNode")(nodes);
  if (subnetsNodes.length) {
    forEach(
      (node) =>
        (subnets[node.id] = {
          resource_name: node.data.values.resourceName,
          name: node.data.values.name,
          resource_group_name: `${vnets?.[node.parentId]?.resource_group_name}`,
          virtual_network_name: `azurerm_virtual_network.${
            vnets?.[node.parentId]?.resource_name
          }.name`,
          address_prefixes: [node.data.values.addressPrefixes],
        })
    )(subnetsNodes);
    res.subnets = Object.values(subnets);
  }

  // process publicIps
  const publicIpsNodes = filter((node) => node.type === "PublicIpNode")(nodes);
  if (publicIpsNodes.length) {
    forEach(
      (node) =>
        (publicIps[node.id] = {
          resource_name: node.data.values.resourceName,
          name: node.data.values.name,
          allocation_method: node.data.values.allocationMethod,
          location: `azurerm_resource_group.${
            resourceGroups?.[node.parentId]?.resource_name
          }.location`,
          resource_group_name: `azurerm_resource_group.${
            resourceGroups?.[node.parentId]?.resource_name
          }.name`,
        })
    )(publicIpsNodes);
    res.publicIps = Object.values(publicIps);
  }

  // process networkInterfaces
  const networkInterfacesNodes = filter(
    (node) => node.type === "NetworkInterfaceNode"
  )(nodes);
  if (networkInterfacesNodes.length) {
    forEach((node) => {
      const subnetVirtualNetworkName =
        subnets?.[node.parentId]?.virtual_network_name || "";

      const vnetRousourceName = subnetVirtualNetworkName.split(".")[1];

      const parentVnet = find(
        (vnet) => vnet.resource_name === vnetRousourceName
      )(Object.values(vnets));

      const relatedPublicIpsRelation = filter(
        (rel) => rel.target === node.id && includes("publicIp", rel.source)
      )(edges)[0];

      networkInterfaces[node.id] = {
        resource_name: node.data.values.resourceName,
        name: node.data.values.name,
        resource_group_name:
          subnets?.[node.parentId]?.resource_group_name ||
          "azurerm_resource_group.undefined.name",
        location:
          parentVnet?.location || "azurerm_resource_group.undefined.location",
        ip_configuration: {
          name: "internal",
          subnet_id: `azurerm_subnet.${
            subnets?.[node.parentId]?.resource_name
          }.id`,
          private_ip_address_allocation: "Dynamic",
          public_ip_address_id: `azurerm_public_ip.${
            publicIps?.[relatedPublicIpsRelation?.source]?.resource_name
          }.id`,
        },
      };
    })(networkInterfacesNodes);
    res.networkInterfaces = Object.values(networkInterfaces);
  }

  // process vms
  const vmsNodes = filter((node) => node.type === "VmNode")(nodes);

  if (vmsNodes.length) {
    forEach((node) => {
      const subnetVirtualNetworkName =
        subnets?.[node.parentId]?.virtual_network_name || "";

      const vnetRousourceName = subnetVirtualNetworkName.split(".")[1];

      const parentVnet = find(
        (vnet) => vnet.resource_name === vnetRousourceName
      )(Object.values(vnets));

      const relatedNetworkInterface = filter(
        (rel) =>
          rel.target === node.id && includes("networkInterface", rel.source)
      )(edges)[0];

      vms[node.id] = {
        resource_name: node.data.values.resourceName,
        name: node.data.values.name,
        size: "Standard_B1s",
        admin_username: node.data.values.adminUsername,
        resource_group_name:
          subnets?.[node.parentId]?.resource_group_name ||
          "azurerm_resource_group.undefined.name",
        location:
          parentVnet?.location || "azurerm_resource_group.undefined.location",
        network_interface_ids: `azurerm_network_interface.${
          networkInterfaces?.[relatedNetworkInterface?.source]?.resource_name
        }.id`,
      };
      res.vms = Object.values(vms);
    })(vmsNodes);
  }

  return res;
};
