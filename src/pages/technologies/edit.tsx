import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/mantine";
import { NumberInput, TextInput } from "@mantine/core";

export const TechnologyEdit: React.FC<IResourceComponentsProps> = () => {
    const {
        getInputProps,
        saveButtonProps,
        setFieldValue,
        refineCore: { queryResult },
    } = useForm({
        initialValues: { id: "", name: "" },
    });

    const technologiesData = queryResult?.data?.data;

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <NumberInput mt="sm" disabled label="Id" {...getInputProps("id")} />
            <TextInput mt="sm" label="Name" {...getInputProps("name")} />
        </Edit>
    );
};
