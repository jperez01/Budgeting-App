export default class dateInfo {
    today:Date;
    current_month:number;
    current_day:number;
    current_year:number;
    constructor() {
        this.today = new Date();
        this.current_year = this.today.getFullYear();
        this.current_month = this.today.getMonth();
        this.current_day = this.today.getDate();
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

    findDaysInMonth(): number {
        if (this.current_month === 1) {
            return 28;
        } else if (this.current_month === 3 || this.current_month === 5 || this.current_month === 9 || this.current_month === 10) {
            return 30;
        } else {
            return 31;
        }
    }

    getMonthAsString(): string {
        return this.today.toLocaleDateString('en-US', {month: 'long'});
    }
}