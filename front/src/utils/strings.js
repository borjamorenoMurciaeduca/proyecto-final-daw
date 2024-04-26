/* eslint-disable no-unneeded-ternary */
/* eslint-disable eol-last */
export const CheckStringAlphanumeric = (value) =>
  value.match(/^[0-9]+$/) === null ? true : false;

export const CheckStringTemplate = (value, template) => {
  if (template === undefined) return true;
  let pattern = '';
  template.split(',').forEach((gp) => {
    if (gp.indexOf('L') === 1) pattern += `[a-zA-Z]{${gp[0]}}`;
    if (gp.indexOf('N') === 1) pattern += `\\d{${gp[0]}}`;
  });
  return new RegExp(`^${pattern}$`).test(value);
};
