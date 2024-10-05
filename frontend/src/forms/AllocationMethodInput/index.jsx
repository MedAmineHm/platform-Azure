import React from "react";
import { Select } from "@mantine/core";
import { Controller } from "react-hook-form";

const AllocationMethodInput = ({
  control,
  disabled = false,
  required = false,
  ...rest
}) => {
  const rules = required || disabled ? { required: "Required!" } : {};

  return (
    <Controller
      control={control}
      name="allocationMethod"
      rules={rules}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => {
        return (
          <Select
            mt="md"
            size="sm"
            label="Allocation Method"
            placeholder="Allocation method"
            control={control}
            disabled={disabled}
            value={value ?? ""}
            error={error?.message}
            withAsterisk={required}
            ref={ref}
            onChange={onChange}
            data={["Dynamic", "Static"]}
            {...rest}
          />
        );
      }}
    />
  );
};

export default AllocationMethodInput;
