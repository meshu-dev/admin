import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/mantine";
import { NumberInput, TextInput } from "@mantine/core";

export const ImageEdit: React.FC<IResourceComponentsProps> = () => {
  const { getInputProps, saveButtonProps } = useForm({
    initialValues: { id: "", url: "", thumb: "" },
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <NumberInput mt="sm" disabled label="Id" {...getInputProps("id")} />
      <TextInput mt="sm" label="Url" {...getInputProps("url")} />
      <TextInput mt="sm" label="Thumb" {...getInputProps("thumb.url")} />
    </Edit>
  );
};
