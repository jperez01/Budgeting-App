export default class dateInfo {
    today:Date;
    current_month:number;
    current_day:number;
    current_year:number;
    all_months:string[];
    constructor() {
        this.today = new Date();
        this.current_year = this.today.getFullYear();
        this.current_month = this.today.getMonth();
        this.current_day = this.today.getDate();
        this.all_months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ]
    }

    getWeekday(): number {
        return this.today.getDay();
    }
    getCurrentDay() {
        return this.current_day;
    }

    getYear(): number {
        return this.current_year;
    }

    getMonth(): number {
        return this.current_month;
    }

    getEndDay(): number {
        if (this.current_month === 1) {
            return 28;
        } else if (this.current_month === 3 || this.current_month === 5 || this.current_month === 9 || this.current_month === 10) {
            return 30;
        } else {
            return 31;
        }
    }
    changeMonthForward(): void {
        if (this.current_month + 1 > 11) {
            this.current_month = 0;
            this.current_year += 1;
        } else {
            this.current_month += 1;
        }
    }

    changeMonthBackward(): void {
        if (this.current_month - 1 < 0) {
            this.current_month = 11;
            this.current_year -= 1;
        } else {
            this.current_month -= 1;
        }
    }

    findDaysInMonth(): number {
        if (this.current_month === 1) {
            return 28;
        } else if (this.current_month === 3 || this.current_month === 5 || this.current_month === 9 || this.current_month === 10) {
            return 30;
        } else {
            return 31;
        }
    }

    findDaysInCertainMonth(month:number): number {
        if (month === 1) {
            return 28;
        } else if (month === 3 || month === 5 || month === 9 || month === 10) {
            return 30;
        } else {
            return 31;
        }
    }

    getMonthAsString(): string {
        return this.all_months[this.current_month];
    }

    inRange(date, min, max): boolean {
        return (date.getTime() <= max.getTime()) && (date.getTime() >= min.getTime());
    }
}