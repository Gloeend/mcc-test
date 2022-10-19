import { useState } from 'react';

export default function useInput(initialValue: string) {
    const [value, setValue] = useState(initialValue);

    const onChange = (e: any) => {
        setValue(e.target.value);
    }

    return {
        value, onChange,
    }
}