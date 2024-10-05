import React from "react";
import { Select } from "@mantine/core";
import { Controller } from "react-hook-form";
import { useAzureLocationsStore } from "../../store";

const LocationInput = ({
  control,
  disabled = false,
  required = false,
  ...rest
}) => {
  const { locationsNames } = useAzureLocationsStore();

  const rules = required || disabled ? { required: "Required!" } : {};

  return (
    <Controller
      control={control}
      name="location"
      rules={rules}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => {
        return (
          <Select
            mt="md"
            size="sm"
            label="Location"
            control={control}
            disabled={disabled}
            value={value ?? ""}
            error={error?.message}
            withAsterisk={required}
            ref={ref}
            onChange={onChange}
            data={locationsNames || []}
            {...rest}
          />
        );
      }}
    />
  );
};

export default LocationInput;
