import React, { useEffect, useState } from "react";
// import style from "./drop-down-list.module.css";
import InputText from "../input-text/input-text";

interface props {
  options?: DropDownOption[];
  className?: string;
  label?: string;
  value?: string;
  error?: boolean;
  sort?: boolean;
  onChange?: (value: string) => void;
}

export interface DropDownOption {
  name: string;
  value: string;
}

const DropDownList = ({
  options,
  className,
  label,
  value,
  error,
  onChange,
  sort,
}: props) => {
  const [optionsList, setOptionsList] = useState<DropDownOption[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [localError, setLocalError] = useState(false);
  const renderOptionsList = () => {
    return optionsList?.map((item, index) => {
      return (
        <div
          key={index}
          className="flex h-[40px] cursor-pointer items-center truncate bg-white pl-2 even:bg-neutral-50 hover:bg-neutral-100"
          onMouseDown={(e) => onClickHandler(e, item)}
        >
          {item.name}
        </div>
      );
    });
  };

  const onClickHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    newValue: DropDownOption
  ) => {
    setText(newValue.name);
    setOpen(false);
    if (onChange) {
      onChange(
        `${optionsList.find((item) => item.name === newValue.name)?.value}`
      );
    }
  };

  const onBlurHandler = async () => {
    if (isOpen) {
      if (optionsList.length > 0 && text !== "") {
        setText(optionsList[0].name);

        if (onChange) onChange(optionsList[0].value);
      } else {
        setText(value ?? "");
        if (onChange) onChange("");
      }
    }

    setOpen(false);
  };

  const onChangeHandler = (value: string) => {
    if (onChange) onChange("");
    setText(value);
  };

  const compareOptions = (a: DropDownOption, b: DropDownOption): number => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;

    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;

    return 0;
  };

  const onFocus = () => {
    setOpen(true);
    if (sort) setOptionsList(options?.sort(compareOptions) || []);
    else setOptionsList(options || []);
  };

  useEffect(() => {
    setLocalError(false);
    if (text === "") {
      if (sort) setOptionsList(options?.sort(compareOptions) || []);
      else setOptionsList(options || []);
      return;
    }
    const newList = options?.filter((item) => {
      if (item.name.toUpperCase().includes(text.toUpperCase().trim())) {
        return true;
      }

      return false;
    });

    if (sort) setOptionsList(newList?.sort(compareOptions) || []);
    else setOptionsList(newList || []);

    if (newList?.length === 0) {
      setLocalError(true);
    }
  }, [options, sort, text]);

  useEffect(() => {
    if (sort) setOptionsList(options?.sort(compareOptions) || []);
    else setOptionsList(options || []);
  }, [options, sort]);

  useEffect(() => {
    if (value)
      setText(`${options?.find((item) => item.value === value)?.name}`);
  }, [options, value]);

  return (
    <div className="relative w-full">
      <InputText
        label={label}
        onFocus={onFocus}
        onBlur={onBlurHandler}
        onChange={onChangeHandler}
        value={text}
        clearIcon
        error={localError}
      />

      {isOpen && (
        <div className="absolute z-10 box-border max-h-[200px] w-full overflow-y-auto border-2">
          {renderOptionsList()}
        </div>
      )}
    </div>
  );
};

export default DropDownList;
