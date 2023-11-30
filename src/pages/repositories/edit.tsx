import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/mantine";
import { NumberInput, TextInput } from "@mantine/core";

export const RepositoryEdit: React.FC<IResourceComponentsProps> = () => {
  const {
    getInputProps,
    saveButtonProps,
  } = useForm({
    initialValues: { id: "", name: "", url: "" },
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <NumberInput mt="sm" disabled label="Id" {...getInputProps("id")} />
      <TextInput mt="sm" label="Name" {...getInputProps("name")} />
      <TextInput mt="sm" label="Url" {...getInputProps("url")} />
    </Edit>
  );
};
