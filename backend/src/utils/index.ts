import { execSync } from 'child_process';

export const executeCommand = (command: string): any => {
  try {
    const output = execSync(command, { encoding: 'utf-8' });
    return output;
  } catch (error) {
    console.error(`Error executing command: ${command}`, error);
    throw error;
  }
};

export const validLocationsNames = [
  'eastus',
  'eastus2',
  'westus',
  'centralus',
  'northcentralus',
  'southcentralus',
  'northeurope',
  'westeurope',
  'eastasia',
  'southeastasia',
  'japaneast',
  'japanwest',
  'australiaeast',
  'australiasoutheast',
  'australiacentral',
  'brazilsouth',
  'southindia',
  'centralindia',
  'westindia',
  'canadacentral',
  'canadaeast',
  'westus2',
  'westcentralus',
  'uksouth',
  'ukwest',
  'koreacentral',
  'koreasouth',
  'francecentral',
  'southafricanorth',
  'uaenorth',
  'switzerlandnorth',
  'germanywestcentral',
  'norwayeast',
  'jioindiawest',
  'westus3',
  'swedencentral',
  'qatarcentral',
  'polandcentral',
  'italynorth',
  'israelcentral',
];
