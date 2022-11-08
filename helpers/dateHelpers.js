class DateHelpers {
	dateNow = new Date();
	nowDayOfWeek = this.dateNow.getDay();
	nowDay = this.dateNow.getDate();
	nowYear = this.dateNow.getFullYear();
	nowMonth = this.dateNow.getMonth();

	formatDate(date) {
		let myYear = date.getFullYear();
		let myMonth = date.getMonth() + 1;
		let myWeekday = date.getDate();
		if (myMonth < 10) {
			myMonth = '0' + myMonth;
		}
		if (myWeekday < 10) {
			myWeekday = '0' + myWeekday;
		}

		let myHour = date.getHours();
		let myMinute = date.getMinutes();
		let mySecond = date.getSeconds();
		if (myHour < 10) {
			myHour = '0' + myHour;
		}
		if (myMinute < 10) {
			myMinute = '0' + myMinute;
		}
		if (mySecond < 10) {
			mySecond = '0' + mySecond;
		}
		return {
			year: myYear,
			month: myMonth,
			day: myWeekday,
			hour: myHour,
			minute: myMinute,
			seconds: mySecond,
		};
	}

	getMonthDays = (myMonth) => {
		const monthStartDate = new Date(this.nowYear, myMonth, 1);
		const monthEndDate = new Date(this.nowYear, myMonth + 1, 1);
		return Math.ceil((monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24));
	};

	getQuarterStartMonth = () => {
		let quarterStartMonth = 0;
		if (this.nowMonth < 3) {
			quarterStartMonth = 0;
		}
		if (2 < this.nowMonth && this.nowMonth < 6) {
			quarterStartMonth = 3;
		}
		if (5 < this.nowMonth && this.nowMonth < 9) {
			quarterStartMonth = 6;
		}
		if (this.nowMonth > 8) {
			quarterStartMonth = 9;
		}
		return quarterStartMonth;
	};

	getDateXDaysAgo = (numOfDays, date = new Date()) => {
		const daysAgo = new Date(date.getTime());

		daysAgo.setDate(date.getDate() - numOfDays);

		return daysAgo;
	};

	//For weeks
	getWeekStartDate = (i = 0, startDayMonday = true) => {
		return new Date(
			this.nowYear,
			this.nowMonth,
			this.nowDay + (startDayMonday ? 1 : 0) - this.nowDayOfWeek + 7 * i
		);
	};
	getWeekEndDate = (i = 0, startDayMonday = true) => {
		return new Date(
			this.nowYear,
			this.nowMonth,
			this.nowDay + (startDayMonday ? 1 : 0) + (6 - this.nowDayOfWeek) + 7 * i,
			23,
			59,
			59
		);
	};

	//For month
	getMonthStartDate = (i = 0) => {
		return new Date(this.nowYear, this.nowMonth + i, 1);
	};
	getMonthEndDate = (i = 0) => {
		return new Date(
			this.nowYear,
			this.nowMonth + i,
			this.getMonthDays(this.nowMonth),
			23,
			59,
			59
		);
	};

	//For quarter
	getQuarterStartDate = (i = 0) => {
		return new Date(this.nowYear, this.getQuarterStartMonth() + 3 * i, 1);
	};
	getQuarterEndDate = (i = 0) => {
		let quarterEndMonth = this.getQuarterStartMonth() + 3 * i + 2;
		return new Date(
			this.nowYear,
			quarterEndMonth,
			this.getMonthDays(quarterEndMonth),
			23,
			59,
			59
		);
	};

	//For year
	getYearStartDate = (i = 0) => {
		return new Date(this.nowYear + i, 0, 1);
	};
	getYearEndDate = (i = 0) => {
		return new Date(this.nowYear + i, 11, this.getMonthDays(11), 23, 59, 59);
	};

	//Days Between Two Dates
	getDaysBetweenTwoDates = (dateTo, dateFrom) => {
		const date1 = new Date(dateTo);
		const date2 = new Date(dateFrom);
		const difference = date1.getTime() - date2.getTime();
		return Math.ceil(difference / (1000 * 3600 * 24));
	};
}

export default new DateHelpers();
