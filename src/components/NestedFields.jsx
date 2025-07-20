import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import FieldItem from "./FieldItem";
import { Button } from "@/components/ui/button";

function NestedFields({ parentIndex, register, setValue, watch }) {
    const { control } = useFormContext();
    const fieldPath = `fields.${parentIndex}.children`;

    const { fields, append, remove } = useFieldArray({
        control,
        name: fieldPath
    });

    return (
        <div className="pl-4 border-l space-y-4">
            <div className="flex items-center justify-between">
                <h4 className="text-sm text-muted-foreground">Nested Fields</h4>
            </div>
            <div className="space-y-3">
                {fields.map((field, nestedIndex) => (
                    <FieldItem
                        key={field.id}
                        field={field}
                        index={`${fieldPath}.${nestedIndex}`}
                        register={register}
                        remove={() => remove(nestedIndex)}
                        setValue={setValue}
                        watch={watch}
                    />
                ))}
            </div>
            <Button
                variant="outline"
                size="sm"
                onClick={() => append({ key: "", type: 'string' })}
            >
                Add Nested Field
            </Button>
        </div>
    );
}

export default NestedFields;
