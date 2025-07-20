import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import NestedFields from "./NestedFields";

const FieldItem = React.forwardRef(({ field, index, register, remove, setValue, watch }, ref) => {
    const fieldName = typeof index === 'string' ? `${index}.key` : `fields.${index}.key`;
    const fieldType = typeof index === 'string' ? `${index}.type` : `fields.${index}.type`;


    const currentKey = watch(fieldName);
    const currentType = watch(fieldType);

    return (
        <div className="border rounded-xl p-4 space-y-2">
            <div className="flex gap-2 items-center">

                <Input
                    placeholder="Field name"
                    value={currentKey || ""}
                    onChange={(e) => setValue(fieldName, e.target.value)}
                />


                <Select
                    value={currentType || ""}
                    onValueChange={(value) => setValue(fieldType, value)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="string">String</SelectItem>
                        <SelectItem value="number">Number</SelectItem>
                        <SelectItem value="boolean">Boolean</SelectItem>
                        <SelectItem value="nested">Nested</SelectItem>
                    </SelectContent>
                </Select>

                <Button variant="destructive" onClick={() => remove(index)}>
                    Delete
                </Button>
            </div>

            {currentType === "nested" && (
                <NestedFields
                    parentIndex={index}
                    register={register}
                    setValue={setValue}
                    watch={watch}
                />
            )}
        </div>
    );
});

FieldItem.displayName = "FieldItem";
export default FieldItem;
