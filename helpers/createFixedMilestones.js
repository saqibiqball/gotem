const createFixedMilestones = (formValue, missionTitle) => {
	return [
		{
			title: `Retainer amount of mission ${missionTitle}`,
			description: 'Retainer amount',
			amount: +formValue.retainerAmount,
		},
		{
			title: `Remaining amount of mission ${missionTitle}`,
			description: 'Remaining amount',
			amount: +formValue.amount - +formValue.retainerAmount,
		},
	];
};

export default createFixedMilestones;
