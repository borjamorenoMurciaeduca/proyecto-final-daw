import parser from '@/utils/parser';
import { Button } from '@mui/material';

export const columns = [
  {
    name: 'property_id',
    label: 'Property ID',
    options: {
      filter: true,
      filterOptions: {
        fullWidth: true,
      },
      customFilterListOptions: { render: (v) => `Propiedad id: ${v}` },
    },
  },
  {
    name: 'location',
    label: 'Localización',
    options: {
      filter: true,
      filterOptions: {
        // names: ['a', 'b', 'c', 'Business Analyst'],
        fullWidth: true,
      },
      // filterType: 'textField',
      customFilterListOptions: { render: (v) => `Descripción: ${v}` },
    },
  },
  {
    name: 'title',
    label: 'Título',
  },
  {
    name: 'share_url',
    label: 'ID URL compartida',
    options: {
      filter: true,
      customFilterListOptions: { render: (v) => `Cargado: ${v}` },
      filterOptions: {
        renderValue: (v) =>
          v ? v.replace(/^(\w).* (.*)$/, '$1. $2') : 'vacío',
      },
    },
  },
  {
    name: 'created_at',
    label: 'Fecha de creación',
  },
  {
    name: 'actions',
    label: 'Acciones',
    options: {
      filter: false,
      sort: false,
      customBodyRender: () => {
        return (
          <Button variant="contained" color="primary">
            Accion
          </Button>
        );
      },
    },
  },
];

export const createRows = (data) => {
  const rows = data.map(
    ({ property_id, title, location, share_url, created_at }) => {
      return {
        property_id,
        title,
        location,
        share_url: !share_url ? '❌' : share_url,
        created_at: parser.DateReceived(created_at),
        actions: !share_url ? '❌' : share_url,
      };
    }
  );
  return rows;
};
