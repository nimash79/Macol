import moment from "jalali-moment"

export const twoDigit = (num) => {
  return ("0" + num).slice(-2);
};

export const formatToCurrency = (amount) => {
  return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

export const cardExpireDate = (date) => {
  moment.locale('fa', { useGregorianParser: true });
  return moment(date).format("YY/MM");
}

export const toShamsi = date => {
  moment.locale('fa', { useGregorianParser: true });
  return moment(date).format("YYYY/MM/DD");
}

export const getTime = date => {
  moment.locale('fa', { useGregorianParser: true });
  return moment(date).format("hh:mm");
}

export const formatDatePicker = date => {
  const m = moment.from(`${date.year}/${twoDigit(date.month)}/${twoDigit(date.day)}`, 'fa', 'YYYY/MM/DD');
  m.locale('en');
  return `${m.year()}/${m.month()+1}/${m.date()}`;
}

export const datePickerToDate = date => {
  date = formatDatePicker(date);
  return new Date(date);
}