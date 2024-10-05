export const getNodeInitValues = (nodeType) => {
  switch (nodeType) {
    case "LocationNode":
      return {
        location: "East US",
      };
    case "ResourceGroupNode":
      return {
        name: "Resource",
        resourceName: "resource-group",
      };
    case "VnetNode":
      return {
        resourceName: "virtual_network",
        addressSpace: "10.0.0.0/16",
        name: "vnet-kube",
      };
    case "SubnetNode":
      return {
        resourceName: "virtual_network",
        addressPrefixes: "10.0.2.0/24",
        name: "vnet-kube",
      };
    case "NetworkInterfaceNode":
      return {
        name: "example-nic",
        resourceName: "network-interface",
      };
    case "DiscNode":
      return {
        location: "",
        name: "Standard_B1s",
        maxDataDiskCount: "",
        memoryInMB: "",
        numberOfCores: "",
        osDiskSizeInMB: "",
        resourceDiskSizeInMB: "",
      };
    case "NsgNode":
      return {
        name: "Network security group",
        resourceGroupName: "resource_group1",
        location: "East US",
      };
    case "PublicIpNode":
      return {
        resourceName: "public-ip",
        name: "Public Ip",
        allocationMethod: "Dynamic",
      };
    case "VmNode":
      return {
        name: "Virtual Machine",
        resourceName: "VM",
        adminUsername: "adminuser",
      };
    default:
      return {
        name: "",
      };
  }
};
