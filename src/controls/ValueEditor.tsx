import React,{useState} from 'react';
import SelectSearch from 'react-select-search';
import { ValueEditorProps } from '../types';

const ValueEditor: React.FC<ValueEditorProps> = ({
  operator,
  value,
  handleOnChange,
  title,
  className,
  type,
  inputType,
  placeHolder,
  values
}) => {
  if (operator === 'null' || operator === 'notNull' || type === "none") {
    return null;
  }

  const onSelectChange = (value:any) => { handleOnChange(value)};
  const onTextInputChange = (e:any) => { handleOnChange(e.target.value)};
  const onCheckboxChange = (e:any) => handleOnChange(e.target.checked);
  const  onAutoSuggetionChange = (value:any) => {
      setVal(value);
      handleOnChange(value);
  };
  const [val, setVal] = useState(value); 
  let options:any[] = [];
  switch (type) {
    case 'select':
        options = values!.map((item)=> {return  {value:item.name, name:item.label}});
      return (<SelectSearch options={options} value={val} placeholder={placeHolder} onChange={onSelectChange}/> );
    case 'autocomplete':       
        options = values!.map((item)=> {return  {value:item.name, name:item.label}});
     return    (<SelectSearch options={options} value={val} placeholder={placeHolder} onChange={onAutoSuggetionChange} search />);   
    case 'checkbox':
      // tslint:disable-next-line: react-a11y-input-elements
      return (<input role="checkbox" type="checkbox" className={className} title={title} onChange={onCheckboxChange} aria-checked={!!value} checked={!!value}/>);
    case 'radio':
      const radioCls = className? className+" radio":"radio";
      return (
        <span className={radioCls} title={title}>
          {values!.map((v) => {
          const isChecked =   value === v.name;
             return (
            <label key={v.name}>
              <input
                type="radio"
                value={v.name}
                aria-checked={isChecked}
                checked={isChecked}
                onChange={onTextInputChange}
              />
              <span className="radio-title">{v.label}</span>
              <span className="circle"></span> 
            </label>
          )})}
        </span>
      );
    default:
      return (
        <div className="rule-value-parent">
        <input
          type={inputType || 'text'}
          value={value}
          title={title}
          className={className}
          placeholder={placeHolder}
          onChange={onTextInputChange}
        /></div>
      );
  }
};

ValueEditor.displayName = 'ValueEditor';

export default ValueEditor;
