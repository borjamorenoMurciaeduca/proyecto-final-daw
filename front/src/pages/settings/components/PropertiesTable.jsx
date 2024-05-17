import { Container, Grid, Skeleton, Typography } from '@mui/material';
import MUIDataTable from 'mui-datatables';
import { columns, createRows } from './tableFills';
import useProperties from '@/hooks/useProperties';
import { useState } from 'react';
import CustomToolbar from './CustomToolbar';

const PropertiesTable = () => {
  const [loading, setLoading] = useState(false);
  const { properties, deleteProperties } = useProperties();

  const rows = createRows(properties);

  const options = {
    // filterType: 'checkbox',
    search: true,
    download: true,
    print: true,
    viewColumns: true,
    filter: true,
    selectableRows: 'multiple',
    rowsPerPageOptions: [5, 10, 20, 50, 100],
    rowsPerPage: 5,
    filterType: 'dropdown',

    // onRowsDelete: (action, state) => {
    //   // Llama a handleRowsDelete y espera a que se complete
    //   const result = handleRowsDelete(action);
    //   console.log('RESULT', result);
    //   // Devuelve el resultado para indicar si las filas deben eliminarse o no
    //   // console.log('RESULT', result);
    //
    //   return false;
    // },
    customToolbarSelect: (selectedRows, _, setSelectedRows) => (
      <CustomToolbar
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        deleteProperties={deleteProperties}
        properties={properties}
      />
    ),
  };

  return (
    <Container
      maxWidth="md"
      component="main"
      sx={{
        minHeight: '40vh',
      }}
    >
      <Grid
        container
        item
        xs={12}
        direction="row"
        justifyContent="flex-end"
        mb={2}
      ></Grid>
      {loading ? (
        <Skeleton variant="rounded" width="100%" height={450} />
      ) : rows.length === 0 || !rows ? (
        <Typography>No hay datos</Typography>
      ) : (
        <MUIDataTable
          title={'Mis viviendas'}
          data={rows}
          columns={columns}
          options={options}
        />
      )}
    </Container>
  );
};

export default PropertiesTable;
