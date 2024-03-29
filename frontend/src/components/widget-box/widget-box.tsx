import React from "react";
import IconBox, { Color } from "./icon-box/icon-box";
import { SvgIconProps } from "@mui/material";
interface props {
  children: React.ReactNode;
  title?: string;
  icon?: React.ReactElement<SvgIconProps>;
  className?: string;
  color?: Color;
  onClick?: () => void;
}

const WidgetBox = ({
  children,
  title,
  icon,
  className,
  color,
  onClick,
}: props) => {
  return (
    <div
      className={`relative w-full rounded bg-white pb-3 shadow
      ${className ? className : ""} 
      ${onClick ? "cursor-pointer duration-100 hover:bg-gray-50" : ""}
      `}
      onClick={onClick}
    >
      <div className="absolute left-[30px] top-[-20px]">
        {(icon || color) && <IconBox color={color} icon={icon} />}
      </div>
      <div className="absolute left-[100px] top-3 text-xl">{title}</div>
      <div className="w-full pt-[50px]">{children}</div>
    </div>
  );
};

export default WidgetBox;
