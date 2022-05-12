export function DateHelperFn(updateDate, dateAndTime) {
  new Date().getFullYear() === dateAndTime.getFullYear()
    ? new Date().getMonth() === dateAndTime.getMonth()
      ? new Date().getDate() === dateAndTime.getDate()
        ? new Date().getHours() === dateAndTime.getHours()
          ? new Date().getMinutes() === dateAndTime.getMinutes()
            ? updateDate(`Created few sec ago`)
            : updateDate(
                `Created ${
                  new Date().getMinutes() - dateAndTime.getMinutes()
                } min ago`
              )
          : new Date().getHours() - dateAndTime.getHours() === 1 &&
            60 - dateAndTime.getMinutes() + new Date().getMinutes() < 60
          ? updateDate(
              `Created ${
                60 - dateAndTime.getMinutes() + new Date().getMinutes()
              } min ago`
            )
          : updateDate(
              `Created ${Math.trunc(
                (60 * (new Date().getHours() - dateAndTime.getHours()) +
                  (60 - dateAndTime.getMinutes())) /
                  60
              )} hour ago`
            )
        : updateDate(
            new Date().getDate() - dateAndTime.getDate() === 1
              ? `Created yesterday`
              : `Created ${
                  new Date().getDate() - dateAndTime.getDate()
                } days ago`
          )
      : updateDate(
          new Date().getMonth() - dateAndTime.getMonth() === 1
            ? `Created last Month`
            : `Created ${
                new Date().getMonth() - dateAndTime.getMonth()
              } Months ago`
        )
    : updateDate(
        new Date().getFullYear() - dateAndTime.getFullYear() === 1
          ? `Created last Year`
          : `Created ${
              new Date().getFullYear() - dateAndTime.getFullYear()
            } Years ago`
      );
}
