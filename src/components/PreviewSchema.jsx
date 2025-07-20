import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

const PreviewSchema = ({ watch }) => {
    const [json, setJson] = useState({});

    useEffect(() => {
        const subscription = watch((data) => {
            const fields = data?.fields || [];
            const transformed = transformToSchema(fields);
            setJson(transformed);
        });


        const fields = watch("fields") || [];
        const transformed = transformToSchema(fields);
        setJson(transformed);

        return () => subscription.unsubscribe();
    }, [watch]);

    const transformToSchema = (fields) => {
        const result = {};

        fields?.forEach(field => {

            if (!field?.key) return;

            if (field.type === 'nested') {

                result[field.key] = field.children?.length
                    ? transformToSchema(field.children)
                    : { "": "" };
            } else {
                result[field.key] = field.type.toUpperCase();
            }
        });

        return result;
    };

    return (
        <Card className="p-6 overflow-auto max-h-[500px] bg-muted">
            <pre className="text-sm font-mono text-left whitespace-pre">
                {JSON.stringify(json, null, 2)}
            </pre>
        </Card>
    );
};

export default PreviewSchema;