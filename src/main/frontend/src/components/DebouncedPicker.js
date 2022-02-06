import React, { useState } from "react";
import useDebounce from "use-debouncy";
import { HexColorPicker, HexColorInput } from "react-colorful";
import TextField from '@material-ui/core/TextField';

export const DebouncedPicker = ({ color, onChange, setValue, errors }) => {
  const [colorValue, setColorValue] = useState(color);
  
  const [pickerShow, setPickerShow] = useState(false)
  const pickerHandler = (e)=>{
    e.preventDefault();
    setPickerShow(!pickerShow)
  }

  useDebounce(() => {
      onChange(colorValue);
      setValue('color', colorValue)
  }, 200, [colorValue]);

  return (
      <>
        <div className="color-picker-area">
            <TextField 
            className="textfield-title"
            id="color" 
            label="태그컬러" 
            size="small" 
            variant="outlined"
            value={colorValue}
            InputLabelProps={{
            shrink: true,
            }}
            onChange={(e)=>setColorValue(e.target.value)}
            error={!!errors.color}
            helperText={errors.color ? errors.color?.message : ''}
            />
            <div className="color-tag-wrapper">
                <button className="color-picker-btn" onClick={pickerHandler}>🎨</button>
                {pickerShow ? (
                <div className="color-picker small">
                    <HexColorPicker 
                    color={colorValue} 
                    onChange={setColorValue} 
                    />
                </div>) : null}
            </div>
        </div>
    </>
  );
};
