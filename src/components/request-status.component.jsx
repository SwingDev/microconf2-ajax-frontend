import React from 'react';

import Loader from 'semantic-ui-react/dist/commonjs/elements/Loader/Loader';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon';

export const RequestStatus = (props) => {
	const { status } = props;

	switch (status) {
		case 'pending':
			return <Loader size='mini' active inline />;
		case 'completed':
			return <Icon size='small' name='check' color='green' />;
		case 'failed':
			return <Icon size='small' name='x' color='red' />;
		default: return <span />;
	}
};
