import useConfirmationDialog from '@/hooks/useConfirmationDialog';
import useProperties from '@/hooks/useProperties';
import { Grid, Typography } from '@mui/material';
import MUIDataTable from 'mui-datatables';
import CustomToolbar from './CustomToolbar';
import { columns, createRows } from './tableFills';

const PropertiesTable = () => {
  const { properties, deleteProperties } = useProperties();
  const { handleOpenDialog, IdealConfirmDialog } = useConfirmationDialog();

  const rows = createRows(properties);

  const options = {
    search: true,
    download: true,
    print: true,
    viewColumns: true,
    filter: true,
    selectableRows: 'multiple',
    rowsPerPageOptions: [5, 10, 20, 50, 100],
    rowsPerPage: 5,
    filterType: 'dropdown',
    customToolbarSelect: (selectedRows, _, setSelectedRows) => (
      <CustomToolbar
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        deleteProperties={deleteProperties}
        properties={properties}
        handleOpenDialog={handleOpenDialog}
      />
    ),
  };

  return (
    <Grid
      component="main"
      container
      item
      justifyContent="center"
      alignItems={'center'}
      xs={7}
      sx={{
        minHeight: '40vh',
        minWidth: '100%',
      }}
    >
      {rows.length === 0 || !rows ? (
        <Typography>No hay datos</Typography>
      ) : (
        <MUIDataTable
          title={'Mis viviendas'}
          data={rows}
          columns={columns(handleOpenDialog)}
          options={options}
        />
      )}
      <IdealConfirmDialog />
    </Grid>
  );
};

export default PropertiesTable;
