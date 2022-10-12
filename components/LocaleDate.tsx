import { FC, useEffect, useState } from "react";
import dayjs from "dayjs";

const LocaleDate: FC<{ date: Date; format?: string }> = ({
  date,
  format = "MMM DD, YYYY",
}) => {
  const [localeDate, setLocalDate] = useState("");
  useEffect(() => {
    setLocalDate(dayjs(date).format(format));
  }, [date, format]);
  return <span>{localeDate}</span>;
};

export default LocaleDate;
