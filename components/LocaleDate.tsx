import { FC, useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

const LocaleDate: FC<{ date: Date; format?: string }> = ({
  date,
  format = "MMM DD, YYYY",
}) => {
  const [localeDate, setLocalDate] = useState("");
  useEffect(() => {
    setLocalDate(dayjs(date).tz("Asia/Seoul").format(format));
  }, [date, format]);
  return <span>{localeDate}</span>;
};

export default LocaleDate;
