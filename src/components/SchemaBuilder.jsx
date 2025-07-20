import React from 'react'
import { useForm, useFieldArray, FormProvider } from "react-hook-form"
import FieldItem from "./FieldItem"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import PreviewSchema from "./PreviewSchema";
import { saveAs } from "file-saver";
const SchemaBuilder = () => {
    const methods = useForm({
        defaultValues: {
            fields: []
        }
    });

    const { fields, append, remove } = useFieldArray({
        control: methods.control,
        name: "fields"
    });

    const addNewField = () => {
        append({
            key: "",
            type: 'string'
        });
    };

    const onSubmit = (data) => {
        console.log("Final JSON:", data)
    }

    const handleExport = () => {
        const data = methods.getValues("fields");
        const blob = new Blob([JSON.stringify(data, null, 2)], {
            type: "application/json"
        });
        saveAs(blob, "schema.json");
    };

    return (
        <FormProvider {...methods}>
            <div className="min-h-screen w-full py-8 flex items-center justify-center">
                <div className="w-full max-w-4xl mx-auto">
                    <div className="rounded-lg border bg-card p-8 shadow-sm">
                        <div className="space-y-2 text-center mb-8">
                            <h1 className="text-3xl font-bold">JSON Schema Builder</h1>
                            <p className="text-muted-foreground">
                                Create dynamic JSON schemas
                            </p>
                        </div>

                        <Tabs defaultValue="builder" className="w-full">
                            <TabsList className="w-full justify-center mb-6">
                                <TabsTrigger value="builder" className="flex-1">
                                    Schema Builder
                                </TabsTrigger>
                                <TabsTrigger value="json" className="flex-1">
                                    JSON Preview
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="builder">
                                <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
                                    <div className="space-y-4">
                                        {fields.map((field, index) => (
                                            <FieldItem
                                                key={field.id}
                                                field={field}
                                                index={index}
                                                register={methods.register}
                                                remove={remove}
                                                setValue={methods.setValue}
                                                watch={methods.watch}
                                            />
                                        ))}
                                    </div>

                                    <div className="space-y-4">
                                        <Button type="button" onClick={addNewField} className="w-full">
                                            Add Field
                                        </Button>

                                        <div className="flex gap-4 justify-end">
                                            <Button type="submit">
                                                Save Schema
                                            </Button>
                                            <Button type="button" variant="outline" onClick={handleExport}>
                                                Export JSON
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </TabsContent>

                            <TabsContent value="json">
                                <PreviewSchema watch={methods.watch} />
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </FormProvider>
    )
}

export default SchemaBuilder