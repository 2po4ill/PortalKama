import React, {ReactNode, useState} from 'react';
import cls from './DropDownInput.module.scss';
import Arrow from "shared/assets/icons/Arrow.png"
import {classNames} from "shared/lib/classNames";

interface Option {
    value: string;
    label: string;
    adornment?: ReactNode;
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

    const modsRotation: Record<string, boolean> = {
        [cls.closed]: !isOpen,
        [cls.opened]: isOpen
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
                <div className={cls.container}>
                    <input type="text"
                       value={inputValue}
                       placeholder={placeholder}
                       className={cls.dropdownInput}
                       onChange={() => handleInputChange}/>
                    <div className={cls.AdornmentInput}> {options.find(option => option.label == selectedValue)?.adornment} </div>
                </div>
                <span className={cls.dropdownArrow}>{
                    <img src={Arrow} alt={"-"} className={classNames(cls.ArrowImg, modsRotation, [])}/>
                    }</span>
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
                                {option.adornment ? option.adornment: null}
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