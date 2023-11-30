import { IResourceComponentsProps, useShow } from "@refinedev/core";
import { Show, NumberField, TextField, UrlField } from "@refinedev/mantine";
import { Title } from "@mantine/core";

export const RepositoryShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title my="xs" order={5}>
        Id
      </Title>
      <NumberField value={record?.id ?? ""} />
      <Title my="xs" order={5}>
        Name
      </Title>
      <TextField value={record?.name} />
      <Title my="xs" order={5}>
        Url
      </Title>
      <UrlField value={record?.url} />
    </Show>
  );
};
