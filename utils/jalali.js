import moment from "jalali-moment";

export const formatDate = (date) => {
    return moment(date).locale('fa').format('D MMM YYYY')
}
