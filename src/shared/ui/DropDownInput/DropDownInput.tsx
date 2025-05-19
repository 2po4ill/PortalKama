import React, { useState } from 'react';
import cls from './DropDownInput.module.scss';
import {Input} from "shared/ui/Input/Input";

interface Option {
    value: string;
    label: string;
}

interface Props {
    options: Option[];
    placeholder?: string;
    onChange?: (value: string) => void;
}

const DropdownInput: React.FC<Props> = ({ options, placeholder = 'Выберите опцию', onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const [inputValue, setInputValue] = useState('');

    const handleClick = () => {
        if (!isOpen) {
            setInputValue("");
            setSelectedValue("");
        }
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (value: string) => {
        setSelectedValue(value);
        setInputValue(value);
        setIsOpen(false);
        onChange?.(value);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(inputValue.toLowerCase())
    );

    return (
        <div className={cls.dropdownWrapper}>
            <div className={cls.dropdown} onClick={handleClick}>
                <Input type="text"
                       value={inputValue}
                       placeholder={placeholder}
                       className={cls.dropdownInput}
                       onChange={() => handleInputChange}/>
                <span className={cls.dropdownArrow}>{isOpen ? '-' : '+'}</span>
            </div>
            {isOpen && (
                <div className={cls.dropdownMenu}>
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map(option => (
                            <div
                                key={option.value}
                                className={cls.dropdownOption}
                                onClick={() => handleOptionClick(option.value)}
                            >
                                {option.label}
                            </div>
                        ))
                    ) : (
                        <div className={cls.dropdownOption}>Ничего не найдено</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DropdownInput;