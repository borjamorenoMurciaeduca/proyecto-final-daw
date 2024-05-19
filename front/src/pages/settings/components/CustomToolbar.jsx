import propertyService from '@/services/propertyService';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useSnackbar } from 'notistack';

const CustomToolbar = ({
  selectedRows,
  setSelectedRows,
  properties,
  deleteProperties,
  handleOpenDialog,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleRowsDelete = async (idsToDelete) => {
    try {
      const res = await propertyService.deleteMultipleProperties(idsToDelete);
      if (res.status === 200) {
        deleteProperties(idsToDelete);
        enqueueSnackbar('Properties deleted successfully', {
          variant: 'success',
        });
      } else {
        throw new Error('Failed to delete properties');
      }
    } catch (error) {
      enqueueSnackbar('Failed to delete properties', { variant: 'error' });
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
        title: 'Eliminar propiedades',
        message: `Vas a eliminar un total de ${len} ${len <= 1 ? 'propiedad' : 'propiedades'}. ¿Estás seguro?`,
      },
      () => handleRowsDelete(idsToDelete)
    );
  };

  return (
    <Box>
      <Tooltip title="Eliminar propiedades">
        <IconButton onClick={confirmDelete} aria-label="delete" size="large">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Eliminar propiedades">
        <IconButton onClick={confirmDelete} aria-label="delete" size="large">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default CustomToolbar;
