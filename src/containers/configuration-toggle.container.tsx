import React, { ReactNode } from 'react';

import { configurationService } from '../services';
import { ConfigurationService } from '../services/configuration.service';
import { Toggle } from 'root/components/toggle.component';

export interface ConfigurationToggleProps {
  configurationKey: keyof ConfigurationService;
  label: string;
}
export interface ConfigurationToggleState {
  configurationKey?: keyof ConfigurationService;
  checked: boolean;
}

export class ConfigurationToggle extends React.Component<ConfigurationToggleProps, ConfigurationToggleState> {
  readonly state: ConfigurationToggleState = {
    checked: false
  };

  static getDerivedStateFromProps(nextProps: ConfigurationToggleProps , prevState: ConfigurationToggleState) {
    if (prevState.configurationKey !== nextProps.configurationKey) {
      return {
        configurationKey: nextProps.configurationKey,
        checked: configurationService[nextProps.configurationKey]
      };
    }

    return null;
  }

  render(): ReactNode {
    const { label } = this.props;
    const { checked } = this.state;

    return (
      <Toggle label={label} checked={checked} onChange={this.toggle} />
    );
  }

  private toggle = (): void => {
    const newValue: boolean = !this.state.checked;

    configurationService[this.props.configurationKey] = newValue;
    this.setState({ checked: newValue });
  }
}
