const valueLabelFormat = (value) => {
  if (value === 0) return '0 €';
  if (value === 100) return '<1M €';
  return `${value * 10}K €`;
};

const valuetext = (value) => `${value} €`;

const marks = [
  {
    value: 0,
    label: '0 €',
  },
  {
    value: 20,
    label: '200K €',
  },
  {
    value: 50,
    label: '500K €',
  },
  {
    value: 80,
    label: '800K €',
  },
  {
    value: 100,
    label: '<1M €',
  },
];
export default {
  valueLabelFormat,
  valuetext,
  marks,
};
