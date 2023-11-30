import { IResourceComponentsProps, useShow } from "@refinedev/core";
import {
  Show,
  NumberField,
  TextField,
  MarkdownField,
  UrlField,
  TagField,
} from "@refinedev/mantine";
import { Title, Group, Image } from "@mantine/core";
import { useSelect } from "@refinedev/mantine";
import { Select } from "@mantine/core";

/*
import { IResourceComponentsProps } from "@refinedev/core";
import { MantineShowInferencer } from "@refinedev/inferencer/mantine";

export const ProjectShow: React.FC<IResourceComponentsProps> = () => {
  return <MantineShowInferencer />;
} */

interface Technology {
  id: number;
  name: string;
}

export const ProjectShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const repositoryList = [];

  if (record?.repositories) {
    for (const repository of record.repositories) {
      repositoryList.push(<TagField value={repository.name} />);
    }
  }

  const technologyList = [];

  if (record?.technologies) {
    for (const technology of record.technologies) {
      technologyList.push(<TagField value={technology.name} />);
    }
  }

  const imageList = [];

  if (record?.images) {
    for (const image of record.images) {
      imageList.push(
        <Image fit="contain" src={image.url} sx={{ maxWidth: "250px" }} />,
      );
    }
  }

  return (
    <Show isLoading={isLoading}>
      <Title my="xs" order={5}>
        Id
      </Title>
      <NumberField value={record?.id ?? ""} />
      <Title my="xs" order={5}>
        Type
      </Title>
      <TextField value={record?.type?.name} />
      <Title my="xs" order={5}>
        Name
      </Title>
      <TextField value={record?.name} />
      <Title mt="xs" order={5}>
        Description
      </Title>
      <MarkdownField value={record?.description} />
      <Title my="xs" order={5}>
        Url
      </Title>
      <UrlField value={record?.url} />
      <Title my="xs" order={5}>
        Repositories
      </Title>
      <Group>{repositoryList}</Group>
      <Title my="xs" order={5}>
        Technologies
      </Title>
      <Group>{technologyList}</Group>
      <Title my="xs" order={5}>
        Images
      </Title>
      <Group>{imageList}</Group>
    </Show>
  );
};
