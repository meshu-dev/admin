import { useList, HttpError } from "@refinedev/core";
import { Group, Image } from "@mantine/core";
import styles from "./imageselect.module.css";

interface Image {
  id: number;
  thumb: {
    id: number;
    url: string;
  };
  url: string;
}

interface Props {
  onImageSelectFtn: (id: number) => void;
  selectedImageId?: number;
}

const ImageSelect = ({ onImageSelectFtn, selectedImageId }: Props) => {
  const imageList = [];

  const { data, isLoading, isError } = useList<Image, HttpError>({
    resource: "images",
    pagination: {
      mode: "off",
    },
  });

  const images: Array<Image> | undefined = data?.data;

  const selectImage = (imageId: number, event: any) => {
    removeSelection(event.target);
    addSelection(event.target);

    onImageSelectFtn(imageId);
  };

  const addSelection = (element: any) => {
    const isProjectImageElement = element.classList.contains(
      styles["project-image"],
    );

    if (isProjectImageElement) {
      element.classList.add(styles["project-image-selected"]);
    } else {
      addSelection(element.parentElement);
    }
  };

  const removeSelection = (element: any) => {
    const isProjectImageElement = element.classList.contains(
      styles["project-image"],
    );

    if (isProjectImageElement) {
      const imageElementList = element.parentElement.children;

      for (const imageElement of imageElementList) {
        imageElement.classList.remove(styles["project-image-selected"]);
      }
    } else {
      removeSelection(element.parentElement);
    }
  };

  if (images) {
    for (const image of images) {
      imageList.push(
        <span
          key={image.id}
          className={
            styles["project-image"] +
            (selectedImageId === image.id
              ? " " + styles["project-image-selected"]
              : "")
          }
          onClick={(event) => selectImage(image.id, event)}
        >
          <Image
            fit="fill"
            key={image.thumb.id}
            src={image.thumb.url}
            width={200}
            height={120}
            withPlaceholder
          />
        </span>,
      );
    }
  }

  return <Group>{imageList}</Group>;
};

export default ImageSelect;
