const createFixedMilestones = (formValue, milestones) => {
	const cloneMilestones = [...milestones];
	cloneMilestones.find((el) => el.description === 'Retainer amount').amount =
		+formValue.retainerAmount;
	cloneMilestones.find((el) => el.description === 'Remaining amount').amount =
		+formValue.amount - +formValue.retainerAmount;
	return cloneMilestones;
};

export default createFixedMilestones;
