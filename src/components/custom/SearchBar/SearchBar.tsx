import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Form, FormField } from '@/components/ui/form';

interface SearchBarProps {
    query?: string;
    onSearch: (query : string ) => void;
    placeholder?: string;
}

export default function SearchBar({ query = "", onSearch, placeholder = "Search.. " } : SearchBarProps) {
    const [searchTerm, setSearchTerm] = useState(query);

    const handleInputChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);
        // onSearch(value); // calls the handler whenever the input changes
    };

    const handleSubmit = (event : any) => {
        event.preventDefault();
        onSearch(searchTerm);
    };

    return <>
        <form onSubmit={handleSubmit} className={"flex items-center border rounded-lg px-4 py-2 shadow-sm bg-white"}>
                <Input
                    className={"w-full focus:outline-none text-gray-700"}
                    type={"text"}
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder={placeholder}/>
        </form>
    </>

}