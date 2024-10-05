import axios from "axios";
import { find, pick } from "ramda";

export const getNodeConfigDefaultValues = (node, nodes) => {
  const values = node?.data?.values;

  let defaultValues = values;
  let additionalValues = {};
  let parentResourceGroup;
  let parentVnet;
  let parentSubnet;

  switch (node.type) {
    // ======================== LOCATION ===================
    case "LocationNode":
      return values ? values : {};

    // ================ Resource Group =====================
    case "ResourceGroupNode":
      if (node.parentId) {
        const parentLocation = find((n) => n.id === node.parentId)(nodes);
        additionalValues = { location: parentLocation.data.values.location };
      }
      return { ...defaultValues, ...additionalValues };

    // ======================== Vnet ===================
    case "VnetNode":
      parentResourceGroup = find((n) => n.id === node.parentId)(nodes);
      if (parentResourceGroup) {
        additionalValues = {
          resourceGroupName: parentResourceGroup.data.values.name,
        };
        const parentLocation = find(
          (n) => n.id === parentResourceGroup.parentId
        )(nodes);
        additionalValues = {
          ...additionalValues,
          location: parentLocation.data.values.location,
        };
      }
      return { ...defaultValues, ...additionalValues };

    // ======================== Subnet ===================
    case "SubnetNode":
      parentVnet = find((n) => n.id === node.parentId)(nodes);
      if (parentVnet) {
        additionalValues = {
          vnetName: parentVnet.data.values.name,
        };
        parentResourceGroup = find((n) => n.id === parentVnet.parentId)(nodes);
        if (parentResourceGroup) {
          additionalValues = {
            ...additionalValues,
            resourceGroupName: parentResourceGroup.data.values.name,
          };
        }
      }
      return { ...defaultValues, ...additionalValues };

    // ====================== Public Ip ====================
    case "PublicIpNode":
      parentResourceGroup = find((n) => n.id === node.parentId)(nodes);
      if (parentResourceGroup) {
        additionalValues = {
          resourceGroupName: parentResourceGroup.data.values.name,
        };
        const parentLocation = find(
          (n) => n.id === parentResourceGroup.parentId
        )(nodes);
        additionalValues = {
          ...additionalValues,
          location: parentLocation.data.values.location,
        };
      }
      return { ...defaultValues, ...additionalValues };

    // ================== Network Interface ============
    case "NetworkInterfaceNode":
      parentSubnet = find((n) => n.id === node.parentId)(nodes);
      if (parentSubnet) {
        parentVnet = find((n) => n.id === parentSubnet.parentId)(nodes);
        if (parentVnet) {
          parentResourceGroup = find((n) => n.id === parentVnet.parentId)(
            nodes
          );
          if (parentResourceGroup) {
            additionalValues = {
              resourceGroupName: parentResourceGroup.data.values.name,
            };
            const parentLocation = find(
              (n) => n.id === parentResourceGroup.parentId
            )(nodes);
            additionalValues = {
              ...additionalValues,
              location: parentLocation.data.values.location,
            };
          }
        }
      }
      return { ...defaultValues, ...additionalValues };

    // ====================== Disc ====================
    case "DiscNode":
      parentSubnet = find((n) => n.id === node.parentId)(nodes);
      if (parentSubnet) {
        parentVnet = find((n) => n.id === parentSubnet.parentId)(nodes);
        if (parentVnet) {
          parentResourceGroup = find((n) => n.id === parentVnet.parentId)(
            nodes
          );
          if (parentResourceGroup) {
            const parentLocation = find(
              (n) => n.id === parentResourceGroup.parentId
            )(nodes);
            additionalValues = {
              location: parentLocation.data.values.location,
            };
          }
        }
      }
      return { ...defaultValues, ...additionalValues };

    // ==================== VM ==========================
    case "VmNode":
      return { ...defaultValues };
  }
};

export const getNodeValues = (nodeDataValues, type) => {
  switch (type) {
    case "LocationNode":
      return pick(["location"], nodeDataValues);
    case "ResourceGroupNode":
      return pick(["name", "resourceName"], nodeDataValues);
    case "VnetNode":
      return pick(["resourceName", "addressSpace", "name"], nodeDataValues);
    case "SubnetNode":
      return pick(["resourceName", "addressSpace", "name"], nodeDataValues);
    case "PublicIpNode":
      return pick(["allocationMethod", "resourceName", "name"], nodeDataValues);
    case "NetworkInterfaceNode":
      return pick(["name", "resourceName"], nodeDataValues);
    case "DiscNode":
      return pick(
        [
          "name",
          "maxDataDiskCount",
          "memoryInMB",
          "numberOfCores",
          "osDiskSizeInMB",
          "resourceDiskSizeInMB",
        ],
        nodeDataValues
      );
    case "VmNode":
      return pick(["name", "resourceName", "adminUsername"]);
  }
};

export const getLocationNameFromDisplayName = (displayName) => {
  return displayName?.toLowerCase()?.replaceAll(" ", "");
};

export const getDiscName = async (
  {
    maxDataDiskCount,
    memoryInMB,
    numberOfCores,
    osDiskSizeInMB,
    resourceDiskSizeInMB,
  },
  location
) => {
  // try {
  //   const data = await axios.get(
  //     `http://localhost:3001/azure/vm-sizes/${location}?maxDataDiskCount=${maxDataDiskCount}&memoryInMB=${memoryInMB}&numberOfCores=${numberOfCores}&osDiskSizeInMB=${osDiskSizeInMB}&resourceDiskSizeInMB=${resourceDiskSizeInMB}`
  //   );
  //   console.log({ data });
  // } catch (e) {
  //   console.error(e);
  // }
};
