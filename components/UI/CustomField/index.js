import React, { forwardRef } from 'react';
import { Form, Input, InputGroup } from 'rsuite';

const Textarea = forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);
Textarea.displayName = 'Textarea';

const CustomField = forwardRef((props, ref) => {
	let {
		name,
		message,
		label,
		accepter,
		error,
		inputIcon,
		inputIconLeft,
		inputButton,
		inputButtonHandler,
		inputButtonLeft,
		className = '',
		...rest
	} = props;

	className += error ? 'has-error' : '';

	return (
		<Form.Group controlId={name} ref={ref} className={className}>
			{label && (
				<Form.ControlLabel>
					{label}
					{message && message.length > 0 && <Form.HelpText>{message}</Form.HelpText>}
				</Form.ControlLabel>
			)}
			{inputIcon || inputButton || inputIconLeft || inputButtonLeft ? (
				<InputGroup inside>
					{inputIconLeft && (
						<InputGroup.Addon>
							<i className={inputIconLeft} />
						</InputGroup.Addon>
					)}
					{inputButtonLeft && (
						<InputGroup.Button onClick={() => inputButtonHandler()}>
							<i className={inputButtonLeft} />
						</InputGroup.Button>
					)}
					<Form.Control
						name={name}
						accepter={accepter === 'textarea' ? Textarea : accepter}
						errorMessage={error}
						errorPlacement={'bottomStart'}
						{...rest}
					/>
					{inputIcon && (
						<InputGroup.Addon>
							<i className={inputIcon} />
						</InputGroup.Addon>
					)}
					{inputButton && (
						<InputGroup.Button onClick={() => inputButtonHandler()}>
							<i className={inputButton} />
						</InputGroup.Button>
					)}
				</InputGroup>
			) : (
				<Form.Control
					name={name}
					accepter={accepter === 'textarea' ? Textarea : accepter}
					errorMessage={error}
					errorPlacement={'bottomStart'}
					{...rest}
				/>
			)}
		</Form.Group>
	);
});
CustomField.displayName = 'CustomField';
export default CustomField;
