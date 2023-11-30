import { useSelect } from "@refinedev/mantine";
import { MultiSelect } from "@mantine/core";

interface Props {
  fieldProps: any;
  onRepositorySelectFtn: (ids: number[]) => void;
}

const RepositorySelect = ({ fieldProps, onRepositorySelectFtn }: Props) => {
  const { selectProps: repositoriesSelectProps } = useSelect({
    resource: "repositories",
    optionLabel: "name",
  });

  return (
    <MultiSelect
      mt="sm"
      label="Repositories"
      data={repositoriesSelectProps.data}
      {...fieldProps}
      onChange={(value: string[]) =>
        onRepositorySelectFtn(value.map((id) => Number(id)))
      }
    />
  );
};

export default RepositorySelect;
