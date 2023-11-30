import { IResourceComponentsProps, useShow } from "@refinedev/core";
import { Show, NumberField, UrlField } from "@refinedev/mantine";
import { Title } from "@mantine/core";

export const ImageShow: React.FC<IResourceComponentsProps> = () => {
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
        Url
      </Title>
      <UrlField value={record?.url} />
      <Title my="xs" order={5}>
        Thumb
      </Title>
      <UrlField value={record?.thumb?.url} />
    </Show>
  );
};
