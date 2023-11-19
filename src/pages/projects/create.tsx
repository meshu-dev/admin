/*
import { IResourceComponentsProps } from "@refinedev/core";
import { MantineCreateInferencer } from "@refinedev/inferencer/mantine";

export const ProjectCreate: React.FC<IResourceComponentsProps> = () => {
  return <MantineCreateInferencer />;
} */

import { IResourceComponentsProps, useList, HttpError } from "@refinedev/core";
import { Create, useForm, useSelect } from "@refinedev/mantine";
import { Select, TextInput, Textarea, MultiSelect, Image, Group, Title, Text } from "@mantine/core";
import styles from './create.module.css'
//import { getTypeOptions, getRepositoryOptions, getTechnologyOptions } from './../../utils/selectOptions'

import TypeSelect from './../../components/dropdown/TypeSelect'
import RepositorySelect from './../../components/dropdown/RepositorySelect'
import TechnologySelect from './../../components/dropdown/TechnologySelect'
import ImageSelect from './../../components/image/ImageSelect'

interface Image {
  id: number;
  thumb: {
    id: number;
    url: string;
  }
  url: string;
}

export const ProjectCreate: React.FC<IResourceComponentsProps> = () => {
  const {
    getInputProps,
    saveButtonProps,
    setFieldValue,
    refineCore: { formLoading },
  } = useForm({
    initialValues: {
      type: 0,
      name: "",
      description: "",
      url: "",
      repositories: {},
      technologies: {},
      images: {}
    },
  });

  const setType         = (id: number): void => setFieldValue('type', id)
  const setRepositories = (ids: number[]): void => setFieldValue('repositories', ids)
  const setTechnologies = (ids: number[]): void => setFieldValue('technologies', ids)
  const setImage        = (id: Number) => setFieldValue('images', [id])

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <TextInput mt="sm" label="Name" {...getInputProps("name")} />
      <Textarea
        mt="sm"
        label="Description"
        autosize
        {...getInputProps("description")}
      />
      <TextInput
        mt="sm"
        label="Url"
        { ...getInputProps("url") } />
      <TypeSelect
        fieldProps={ getInputProps("type.id") }
        onTypeSelectFtn={ setType } />
      <RepositorySelect
        fieldProps={ getInputProps("repositories") }
        onRepositorySelectFtn={ setRepositories } />
      <TechnologySelect
        fieldProps={ getInputProps("technologies") }
        onTechnologySelectFtn={ setTechnologies } />
      <Text fz="sm">
        Images
      </Text>
      <ImageSelect
        onImageSelectFtn={ setImage } />
    </Create>
  )
}
