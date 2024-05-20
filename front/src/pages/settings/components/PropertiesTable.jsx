import useConfirmationDialog from '@/hooks/useConfirmationDialog';
import useProperties from '@/hooks/useProperties';
import { Grid, Typography } from '@mui/material';
import MUIDataTable from 'mui-datatables';
import CustomToolbar from './CustomToolbar';
import { Columns, createRows } from './TableFills';

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
    responsive: 'vertical',
    selectableRows: 'multiple',
    rowsPerPageOptions: [5, 10, 20, 50, 100],
    rowsPerPage: 5,
    filterType: 'dropdown',
    sortOrder: {
      name: 'created_at',
      direction: 'desc',
    },
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
      justifyContent="center"
      alignItems={'center'}
      sx={{
        minHeight: '40vh',
        minWidth: '100%',
      }}
    >
      <Grid item xs={9}>
        <MUIDataTable
          title={'Mis viviendas'}
          data={rows}
          columns={Columns(handleOpenDialog)}
          options={options}
        />
        <IdealConfirmDialog />
      </Grid>
    </Grid>
  );
};

export default PropertiesTable;
