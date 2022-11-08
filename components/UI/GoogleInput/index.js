import Autocomplete from 'react-google-autocomplete';
import React from 'react';

const GoogleInput = ({ onPlaceSelected, error, label, defaultValue, setFormValue, ...props }) => {
	return (
		<>
			<div className={error ? 'rs-form-group  has-error ' : 'rs-form-group '} role="group">
				<label id="title-control-label" htmlFor="title" className="rs-form-control-label">
					{label}
				</label>
				<div className="rs-form-control rs-form-control-wrapper">
					<Autocomplete
						apiKey={process.env.NEXT_PUBLIC_GOOGLE_KEY}
						onPlaceSelected={onPlaceSelected}
						language={'en'}
						className="rs-input"
						defaultValue={defaultValue}
						onChange={(e) => {
							setFormValue((prevState) => ({
								...prevState,
								location: e.target.value,
							}));
						}}
						options={{
							types: ['(regions)'],
						}}
						{...props}
					/>
					{error && (
						<div
							id="title-error-message"
							role="alert"
							aria-relevant="all"
							className="rs-form-control-message-wrapper rs-form-error-message-wrapper rs-form-error-message-placement-bottom-start"
						>
							<span className="rs-form-error-message rs-form-error-message-show">
								<span className="rs-form-error-message-arrow" />
								<span className="rs-form-error-message-inner">{error}</span>
							</span>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default GoogleInput;
