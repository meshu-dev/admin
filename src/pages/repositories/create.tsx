import { IResourceComponentsProps } from "@refinedev/core";
import { Create, useForm } from "@refinedev/mantine";
import { TextInput } from "@mantine/core";

export const RepositoryCreate: React.FC<IResourceComponentsProps> = () => {
    const {
        getInputProps,
        saveButtonProps,
        refineCore: { formLoading },
    } = useForm({
        initialValues: { name: "", url: "" },
    });

    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <TextInput mt="sm" label="Name" {...getInputProps("name")} />
            <TextInput mt="sm" label="Url" {...getInputProps("url")} />
        </Create>
    );
};
