import moment from "moment";
import React, { PureComponent } from "react";
import DayPicker from "react-day-picker";
import MomentLocaleUtils from "react-day-picker/moment";

import { lang } from "../../../../utils/i18n";
import { toIndexDate } from "../../../../utils/dateFormat";
import CalendarNavContainer from "./CalendarNavContainer";

interface Props {
	dateSelected: Date;
	entries: Entries;
	monthSelected: Date;
	setDateSelected: (date: Date) => void;
}

export default class Calendar extends PureComponent<Props, {}> {
	constructor(props: Props) {
		super(props);

		// Function bindings
		this.onDateSelection = this.onDateSelection.bind(this);
	}

	onDateSelection(date: Date) {
		const { setDateSelected } = this.props;

		if (moment(date).isSameOrBefore(moment(), "day")) {
			setDateSelected(date);
		}
	}

	render() {
		const { dateSelected, entries, monthSelected } = this.props;

		const today = new Date();
		const daysWithEntries = Object.keys(entries);
		const hasEntry = (day: Date): boolean => {
			const indexDate = toIndexDate(day);
			return daysWithEntries.includes(indexDate);
		};

		return (
			<DayPicker
				selectedDays={dateSelected}
				disabledDays={{ after: today }}
				month={monthSelected}
				toMonth={today}
				captionElement={() => null}
				modifiers={{ hasEntry }}
				locale={lang}
				localeUtils={MomentLocaleUtils}
				navbarElement={<CalendarNavContainer />}
				onDayClick={this.onDateSelection}
			/>
		);
	}
}
