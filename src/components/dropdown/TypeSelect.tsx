import { useSelect } from "@refinedev/mantine";
import { Select } from "@mantine/core";

interface Props {
  fieldProps: any;
  onTypeSelectFtn: (id: number) => void;
}

const TypeSelect = ({ fieldProps, onTypeSelectFtn }: Props) => {
  const { selectProps: typeSelectProps } = useSelect({
    resource: "types",
    optionLabel: "name",
  });

  return (
    <Select
      mt="sm"
      label="Type"
      {...fieldProps}
      {...typeSelectProps}
      searchable={false}
      onChange={(value: string | null) => onTypeSelectFtn(Number(value))}
    />
  );
};

export default TypeSelect;
