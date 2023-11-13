/*
import { IResourceComponentsProps } from "@refinedev/core";
import { MantineListInferencer } from "@refinedev/inferencer/mantine";

export const ProjectList: React.FC<IResourceComponentsProps> = () => {
  return <MantineListInferencer />;
} */

import React from "react";
import { GetManyResponse, IResourceComponentsProps } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { ScrollArea, Table, Pagination, Group, Image } from "@mantine/core";
import {
    List,
    EditButton,
    ShowButton,
    DeleteButton,
    MarkdownField,
    UrlField,
    TagField,
} from "@refinedev/mantine";

export const ProjectList: React.FC<IResourceComponentsProps> = () => {
    const columns = React.useMemo<ColumnDef<any>[]>(
        () => [
            {
                id: "id",
                accessorKey: "id",
                header: "Id",
            },
            {
                id: "type",
                header: "Type",
                accessorKey: "type.name",
            },
            {
                id: "name",
                accessorKey: "name",
                header: "Name",
            },
            {
                id: "description",
                accessorKey: "description",
                header: "Description",
                cell: function render({ getValue }) {
                    return (
                        <MarkdownField
                            value={getValue<string>()?.slice(0, 80) + "..."}
                        />
                    );
                },
            },
            {
                id: "url",
                accessorKey: "url",
                header: "Url",
                cell: function render({ getValue }) {
                    return <UrlField value={getValue<any>()} />;
                },
            },
            {
                id: "repositories",
                header: "Repositories",
                accessorKey: "repositories",
                cell: function render({ getValue, table }) {
                    const meta = table.options.meta as {
                        repositoriesData: GetManyResponse;
                    };

                    const repositories = getValue<any[]>()?.map((item) => {
                        return item;
                    });

                    return (
                        <Group spacing="xs">
                            {repositories?.map((item, index) => (
                                <TagField key={index} value={item?.name} />
                            ))}
                        </Group>
                    );
                },
            },
            {
                id: "technologies",
                header: "Technologies",
                accessorKey: "technologies",
                cell: function render({ getValue, table }) {
                    const meta = table.options.meta as {
                        technologiesData: GetManyResponse;
                    };

                    const technologies = getValue<any[]>()?.map((item) => {

                      console.log('AAA', table, meta.technologiesData?.data, item);

                        return item;
                    });

                    return (
                        <Group spacing="xs">
                            {technologies?.map((item, index) => (
                                <TagField key={index} value={item?.name} />
                            ))}
                        </Group>
                    );
                },
            },
            {
                id: "images",
                accessorKey: "images",
                header: "Images",

                cell: function render({ getValue }) {
                    try {
                        return (
                            <Group spacing="xs">
                                {getValue<any[]>()?.map((item, index) => (
                                    <Image
                                        src={item?.url}
                                        key={index}
                                        sx={{ maxWidth: "100px" }}
                                    />
                                ))}
                            </Group>
                        );
                    } catch (error) {
                        return null;
                    }
                },
            },
            {
                id: "actions",
                accessorKey: "id",
                header: "Actions",
                cell: function render({ getValue }) {
                    return (
                        <Group spacing="xs" noWrap>
                            <ShowButton
                                hideText
                                recordItemId={getValue() as string}
                            />
                            <EditButton
                                hideText
                                recordItemId={getValue() as string}
                            />
                            <DeleteButton
                                hideText
                                recordItemId={getValue() as string}
                            />
                        </Group>
                    );
                },
            },
        ],
        [],
    );

    const {
        getHeaderGroups,
        getRowModel,
        setOptions,
        refineCore: {
            setCurrent,
            pageCount,
            current,
            tableQueryResult: { data: tableData },
        },
    } = useTable({
        columns,
    });

    setOptions((prev) => ({
        ...prev,
        meta: {
            ...prev.meta,
        },
    }));

    return (
        <List>
            <ScrollArea>
                <Table highlightOnHover>
                    <thead>
                        {getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <th key={header.id}>
                                            {!header.isPlaceholder &&
                                                flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext(),
                                                )}
                                        </th>
                                    );
                                })}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {getRowModel().rows.map((row) => {
                            return (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <td key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext(),
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </ScrollArea>
            <br />
            <Pagination
                position="right"
                total={pageCount}
                page={current}
                onChange={setCurrent}
            />
        </List>
    );
};

