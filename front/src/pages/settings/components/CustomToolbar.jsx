import propertyService from '@/services/propertyService';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';

const CustomToolbar = ({
  selectedRows,
  setSelectedRows,
  properties,
  deleteProperties,
  handleOpenDialog,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const handleRowsDelete = async (idsToDelete) => {
    try {
      const res = await propertyService.deleteMultipleProperties(idsToDelete);
      if (res.status === 200) {
        deleteProperties(idsToDelete);
        enqueueSnackbar(t('snackbar.delete-properties.success'), {
          variant: 'success',
        });
      } else {
        throw new Error('Failed to delete properties');
      }
    } catch (error) {
      enqueueSnackbar(t('snackbar.delete-properties.error'), {
        variant: 'error',
      });
      console.error('Error deleting properties:', error);
    } finally {
      setSelectedRows([]);
    }
  };

  /**
   * Buscamos los ids de las propiedades seleccionadas y mostramos un dialogo de confirmación
   * Para elimnarlas debemos aceptar el dialogo, tiene un callback a handleRowsDelete
   */
  const confirmDelete = () => {
    const idsToDelete = selectedRows.data.map(
      (d) => properties[d.dataIndex].property_id
    );
    const len = idsToDelete.length;
    handleOpenDialog(
      {
        title: t(
          'page.configuration-management.table.dialog.delete-properties.title'
        ),
        message: t(
          'page.configuration-management.table.dialog.delete-properties.message',
          { len }
        ),
        confirmButtonText: t(
          'page.configuration-management.table.dialog.delete-properties.confirm-button-text'
        ),
        cancelButtonText: t(
          'page.configuration-management.table.dialog.delete-properties.cancel-button-text'
        ),
      },
      () => handleRowsDelete(idsToDelete)
    );
  };

  return (
    <Box>
      <Tooltip
        title={t(
          'page.configuration-management.table.tooltip.delete-properties'
        )}
      >
        <IconButton onClick={confirmDelete} aria-label="delete" size="large">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default CustomToolbar;
