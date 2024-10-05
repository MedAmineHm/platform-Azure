import React, { useEffect } from "react";
import { Box, Button, Grid, Group, LoadingOverlay, Text } from "@mantine/core";
import { useForm } from "react-hook-form";

import classes from "./styles.module.css";
import LocationInput from "../../forms/LocationInput";
import ResourceNameInput from "../../forms/ResourceName";
import NameInput from "../../forms/NameInput";
import VirtualNetworkNameInput from "../../forms/VirtualNetworkNameInput";
import ResourceGroupNameInput from "../../forms/ResourceGroupInput";
import AddressSpaceInput from "../../forms/AddressSpaceInput";
import AddressPrefixesInput from "../../forms/AddressPrefixesInput";
import MaxDataDiskCountInput from "../../forms/MaxDataDiskCountInput";
import MemoryInMBInput from "../../forms/MemoryInMBInput";
import NumberOfCoresInput from "../../forms/NumberOfCoresInput";
import OsDiskSizeInMBInput from "../../forms/OsDiskSizeInMBInput";
import ResourceDiskSizeInMBInput from "../../forms/ResourceDiskSizeInMB";
import AllocationMethodInput from "../../forms/AllocationMethodInput";
import {
  getDiscName,
  getLocationNameFromDisplayName,
  getNodeConfigDefaultValues,
} from "../../utils/nodeConfigForm";
import { useLoadNodeConfigFormOptions } from "../../hooks/NodeConfigForm";
import AdminUserNameInput from "../../forms/AdminUserNameInput";

const NodeConfigForm = ({ node, close, onConfirm, nodes }) => {
  const defaultValues = getNodeConfigDefaultValues(node, nodes);
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues,
  });

  const { options, isLoading, isError } = useLoadNodeConfigFormOptions(
    node,
    getLocationNameFromDisplayName(defaultValues.location)
  );

  const setDiscName = async () => {
    const {
      maxDataDiskCount,
      memoryInMB,
      numberOfCores,
      osDiskSizeInMB,
      resourceDiskSizeInMB,
    } = getValues();
    // if (
    //   maxDataDiskCount &&
    //   memoryInMB &&
    //   numberOfCores &&
    //   osDiskSizeInMB &&
    //   resourceDiskSizeInMB
    // ) {
    //   setValue("name", "Standard_B1s");
    //   const nameFromServer = await getDiscName(
    //     {
    //       maxDataDiskCount,
    //       memoryInMB,
    //       numberOfCores,
    //       osDiskSizeInMB,
    //       resourceDiskSizeInMB,
    //     },
    //     getLocationNameFromDisplayName(defaultValues.location)
    //   );
    // } else {
    //   setValue("name", "");
    // }
  };

  const Fields = () => {
    switch (node.type) {
      case "LocationNode":
        return (
          <>
            <LocationInput control={control} required={true} />
          </>
        );
      case "ResourceGroupNode":
        return (
          <>
            <ResourceNameInput control={control} required={true} />
            <LocationInput control={control} required={true} disabled />
            <NameInput control={control} required={true} />
          </>
        );
      case "VnetNode":
        return (
          <>
            <ResourceNameInput control={control} required={true} />
            <AddressSpaceInput control={control} required={true} />
            <LocationInput control={control} required={true} disabled />
            <NameInput control={control} required={true} />
            <ResourceGroupNameInput
              control={control}
              required={true}
              disabled
            />
          </>
        );
      case "SubnetNode":
        return (
          <>
            <ResourceNameInput control={control} required={true} />
            <AddressPrefixesInput control={control} required={true} />
            <NameInput control={control} required={true} />
            <VirtualNetworkNameInput
              control={control}
              required={true}
              disabled
            />
            <ResourceGroupNameInput
              control={control}
              required={true}
              disabled
            />
          </>
        );
      case "DiscNode":
        return (
          <>
            <LocationInput control={control} required={true} disabled />
            <Grid>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <MaxDataDiskCountInput
                  control={control}
                  required={true}
                  data={options?.maxDataDiskCount || []}
                  setDiscName={setDiscName}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <MemoryInMBInput
                  control={control}
                  required={true}
                  data={options?.memoryInMB || []}
                  setDiscName={setDiscName}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <ResourceDiskSizeInMBInput
                  control={control}
                  required={true}
                  data={options?.resourceDiskSizeInMB || []}
                  setDiscName={setDiscName}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <NumberOfCoresInput
                  control={control}
                  required={true}
                  data={options?.numberOfCores || []}
                  setDiscName={setDiscName}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <OsDiskSizeInMBInput
                  control={control}
                  required={true}
                  data={options?.osDiskSizeInMB || []}
                  setDiscName={setDiscName}
                />
              </Grid.Col>
            </Grid>
            <NameInput control={control} required={true} disabled />
          </>
        );
      case "PublicIpNode":
        return (
          <>
            <ResourceNameInput control={control} required={true} />
            <NameInput control={control} required={true} />
            <ResourceGroupNameInput
              control={control}
              required={true}
              disabled
            />
            <LocationInput control={control} required={true} disabled />
            <AllocationMethodInput control={control} required />
          </>
        );
      case "NsgNode":
        return (
          <>
            <NameInput control={control} required={true} />
            <ResourceGroupNameInput
              control={control}
              required={true}
              disabled
            />
            <LocationInput control={control} required={true} disabled />
          </>
        );
      case "VmNode":
        return (
          <>
            <NameInput control={control} required={true} />
            <ResourceNameInput control={control} required={true} />
            {/* <ResourceGroupNameInput
              control={control}
              required={true}
              disabled
            />
            <LocationInput control={control} required={true} disabled /> */}
            <AdminUserNameInput control={control} required={true} />
          </>
        );
      case "NetworkInterfaceNode":
        return (
          <>
            <ResourceNameInput control={control} required={true} />
            <NameInput control={control} required={true} />
            <ResourceGroupNameInput
              control={control}
              required={true}
              disabled
            />
            <LocationInput control={control} required={true} disabled />
          </>
        );
      default:
        return (
          <>
            <p>Type Not Configured!</p>
          </>
        );
    }
  };

  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />

      <form onSubmit={handleSubmit(onConfirm)}>
        <Box className={classes.inputsContainer}>
          <Fields />
        </Box>

        <Group grow>
          <Button variant="filled" color="pink" onClick={close}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="filled"
            color="violet"
            disabled={!isValid || isSubmitting}
          >
            Confirm
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default NodeConfigForm;
