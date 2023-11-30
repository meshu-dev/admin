import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm, useSelect } from "@refinedev/mantine";
import {
  NumberInput,
  Select,
  TextInput,
  Textarea,
  MultiSelect,
  Image,
  Group,
  Title,
  Text,
} from "@mantine/core";
import { useEffect } from "react";

/*
import { IResourceComponentsProps } from "@refinedev/core";
import { MantineEditInferencer } from "@refinedev/inferencer/mantine";

export const ProjectEdit: React.FC<IResourceComponentsProps> = () => {
  return <MantineEditInferencer />;
} */

import TypeSelect from "./../../components/dropdown/TypeSelect";
import RepositorySelect from "./../../components/dropdown/RepositorySelect";
import TechnologySelect from "./../../components/dropdown/TechnologySelect";
import ImageSelect from "./../../components/image/ImageSelect";

export const ProjectEdit: React.FC<IResourceComponentsProps> = () => {
  const {
    getInputProps,
    saveButtonProps,
    setFieldValue,
    refineCore: { queryResult },
  } = useForm({
    initialValues: {
      id: "",
      typeSelected: { id: 0 },
      type: 0,
      name: "",
      description: "",
      url: "",
      repositories: {},
      technologies: {},
      images: {},
    },
    transformValues: (values) => {
      values.type = values.typeSelected.id;
      return values;
    },
  });

  const projectsData = queryResult?.data?.data;

  const setType = (id: number): void => setFieldValue("typeSelected", { id });
  const setRepositories = (ids: number[]): void =>
    setFieldValue("repositories", ids);
  const setTechnologies = (ids: number[]): void =>
    setFieldValue("technologies", ids);
  const setImage = (id: Number): void => setFieldValue("images", [id]);

  useEffect(() => {
    setFieldValue("typeSelected", { id: projectsData?.type?.id });
    setFieldValue(
      "repositories",
      projectsData?.repositories?.map((item: any) => item?.id),
    );
    setFieldValue(
      "technologies",
      projectsData?.technologies?.map((item: any) => item?.id),
    );
    setFieldValue("images", [projectsData?.images[0]["id"]]);
  }, [projectsData]);

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <NumberInput mt="sm" disabled label="Id" {...getInputProps("id")} />
      <TextInput mt="sm" label="Name" {...getInputProps("name")} />
      <Textarea
        mt="sm"
        label="Description"
        autosize
        {...getInputProps("description")}
      />
      <TextInput mt="sm" label="Url" {...getInputProps("url")} />
      <TypeSelect
        fieldProps={getInputProps("typeSelected.id")}
        onTypeSelectFtn={setType}
      />
      <RepositorySelect
        fieldProps={getInputProps("repositories")}
        onRepositorySelectFtn={setRepositories}
      />
      <TechnologySelect
        fieldProps={getInputProps("technologies")}
        onTechnologySelectFtn={setTechnologies}
      />
      <Text fz="sm">Images</Text>
      <ImageSelect
        onImageSelectFtn={setImage}
        selectedImageId={projectsData?.images[0]["id"]}
      />
    </Edit>
  );
};
