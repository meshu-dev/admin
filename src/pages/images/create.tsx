/*
import { IResourceComponentsProps } from "@refinedev/core";
import { MantineCreateInferencer } from "@refinedev/inferencer/mantine";

export const ImageCreate: React.FC<IResourceComponentsProps> = () => {
  return <MantineCreateInferencer />;
} */

import { useEffect, useState } from "react";
import axios from "axios";
import { HttpError, useApiUrl } from "@refinedev/core";
import { Create, useForm, useSelect } from "@refinedev/mantine";
import { Select, TextInput, Text, SimpleGrid, Image } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from "@mantine/dropzone";
import { getRequestConfig } from '../../LaravelProvider'

interface FormValues {
  images: FileWithPath[];
}

let currentImage: FileWithPath

export const ImageCreate: React.FC = () => {
    const [isUploadLoading, setIsUploadLoading] = useState(false);

    const { refineCore: { onFinish, redirect }, saveButtonProps, getInputProps, setFieldValue, values, errors } = useForm<
      any,
      HttpError,
      FormValues
    >({
        initialValues: {
            images: [],
        }
    });

    const apiUrl = useApiUrl();

  const [files, setFiles] = useState<FileWithPath[]>([]);

  const previews = files.map((file, index) => {
    currentImage = file
    const imageUrl = URL.createObjectURL(file);
    return <Image key={index} src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />;
  });

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('image', currentImage);
    formData.append('thumb', 'true');

    const response: any = await axios.post<{ url: string }>(
      `${apiUrl}/images`,
      formData,
      getRequestConfig()
    );

    const data = response.data.data
    redirect("show", data.id)
  }

    return (
      <Create saveButtonProps={{ onClick: uploadImage, disabled: false }}>
        <form>
          <Text mt={8} weight={500} size="sm" color="#212529">
              Upload Image
          </Text>
          <Dropzone accept={IMAGE_MIME_TYPE} onDrop={setFiles} loading={isUploadLoading}>
            <Text ta="center">Drop images here</Text>
          </Dropzone>
          <SimpleGrid cols={2} mt={previews.length > 0 ? 'xl' : 0}>
            {previews}
          </SimpleGrid>
        </form>
      </Create>
    );
};



