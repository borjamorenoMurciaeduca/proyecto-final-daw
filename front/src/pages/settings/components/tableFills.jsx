import parser from '@/utils/parser';
import { Button } from '@mui/material';

export const columns = (handleOpenDialog) => [
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
    name: 'is_shared',
    label: 'Visibilidad',
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value, tableMeta) => {
        const propertyId = tableMeta.rowData[0];
        if (value) {
          return (
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() =>
                handleOpenDialog({
                  title: 'Hacer privada',
                  message: `Are you sure you want to make private this property ${propertyId}?`,
                })
              }
            >
              Make private
            </Button>
          );
        }
      },
    },
  },
  {
    name: 'created_at',
    label: 'Fecha de creación',
  },
];

export const createRows = (data) => {
  return data.map(
    ({ property_id, title, location, share_url, created_at, is_shared }) => ({
      property_id,
      title,
      location,
      share_url: !share_url ? '❌' : share_url,
      created_at: parser.DateReceived(created_at),
      is_shared,
    })
  );

  // Agregar columna de botones solo si action_share tiene un valor
  // otra forma de añadir, tenemos que
  //   if (is_shared) {
  //     row.is_shared = (
  //       <Button
  //         variant="contained"
  //         color="primary"
  //         onClick={() => console.log('Make private')}
  //       >
  //         Make private2
  //       </Button>
  //     );
  //   }
  //
  //   return row;
  // }
  // return rows;
};
