import React from 'react';

import Checkbox, { CheckboxProps } from 'semantic-ui-react/dist/commonjs/modules/Checkbox';

export interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}
export const Toggle: React.SFC<ToggleProps> = (props: ToggleProps & CheckboxProps) => {
  const { label, checked, onChange, ...checkboxProps } = props;

  return (
    <Checkbox
      toggle
      label={<label>{label}</label>}
      checked={checked}
      onChange={onChange}
      {...checkboxProps}
    />
  );
};
