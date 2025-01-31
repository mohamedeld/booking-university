'use client';

import { useState } from "react";
import { HexColorPicker } from "react-colorful";

interface IProps{
  value?:string;
  onPickerChange:(color:string)=>void;
}

const ColorPicker = ({value,onPickerChange}:IProps) => {
  
  return <HexColorPicker color={value}  onChange={onPickerChange} />;
};


export default ColorPicker;

