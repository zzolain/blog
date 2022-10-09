import { FC, useEffect, useState } from "react";
import moment from "moment";

const LocaleDate: FC<{ date: string; format?: string }> = ({
  date,
  format = "MMM DD, YYYY",
}) => {
  const [localeDate, setLocalDate] = useState("");
  useEffect(() => {
    setLocalDate(moment(date).format(format));
  }, [date, format]);
  return <span>{localeDate}</span>;
};

export default LocaleDate;
