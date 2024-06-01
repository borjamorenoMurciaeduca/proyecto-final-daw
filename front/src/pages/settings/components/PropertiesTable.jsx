import useConfirmationDialog from '@/hooks/useConfirmationDialog';
import useProperties from '@/hooks/useProperties';
import { Grid } from '@mui/material';
import MUIDataTable from 'mui-datatables';
import CustomToolbar from './CustomToolbar';
import { Columns, createRows } from './TableFills';
import { useTranslation } from 'react-i18next';

const PropertiesTable = () => {
  const { properties, deleteProperties } = useProperties();
  const { handleOpenDialog, IdealConfirmDialog } = useConfirmationDialog();
  const { t } = useTranslation();

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

    textLabels: {
      body: {
        noMatch: t('page.configuration-management.table.no-match'),
        toolTip: t('page.configuration-management.table.tooltip.sort'),
        columnHeaderTooltip: (column) =>
          `${t('page.configuration-management.table.tooltip.sort-for')} "${
            column.label
          }"`,
      },
      toolbar: {
        search: t('page.configuration-management.table.search'),
        downloadCsv: t('page.configuration-management.table.download-csv'),
        print: t('page.configuration-management.table.print'),
        viewColumns: t(
          'page.configuration-management.table.view-columns.title'
        ),
        filterTable: t('page.configuration-management.table.filter-table'),
      },
      pagination: {
        next: t('page.configuration-management.table.pagination.next'),
        previous: t('page.configuration-management.table.pagination.previous'),
        rowsPerPage: t(
          'page.configuration-management.table.pagination.rows-per-page'
        ),
        displayRows: t(
          'page.configuration-management.table.pagination.display-rows'
        ),
      },
      filter: {
        all: t('page.configuration-management.table.filter.all'),
        title: t('page.configuration-management.table.filter.title'),
        reset: t('page.configuration-management.table.filter.reset'),
      },
      viewColumns: {
        title: t('page.configuration-management.table.view-columns.title'),
        titleAria: t(
          'page.configuration-management.table.view-columns.titleAria'
        ),
      },
      selectedRows: {
        text: t('page.configuration-management.table.selected-rows.text'),
        delete: t('page.configuration-management.table.selected-rows.delete'),
        deleteAria: t(
          'page.configuration-management.table.selected-rows.delete-aria'
        ),
      },
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
      mb={4}
    >
      <Grid item xs={9}>
        <MUIDataTable
          title={t('page.configuration-management.table.my-properties')}
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
