import { useSelect } from "@refinedev/mantine";
import { MultiSelect } from "@mantine/core";

interface Props {
  fieldProps: any
  onTechnologySelectFtn: (ids: number[]) => void
}

const TechnologySelect = ({ fieldProps, onTechnologySelectFtn }: Props) => {
  const { selectProps: technologiesSelectProps } = useSelect({
    resource: "technologies",
    optionLabel: "name",
  })

  return (
    <MultiSelect
      mt="sm"
      label="Technologies"
      data={ technologiesSelectProps.data }
      { ...fieldProps }
      onChange={ ((value: string[]) => onTechnologySelectFtn(value.map((id) => Number(id)))) }
    />
  );
}

export default TechnologySelect
