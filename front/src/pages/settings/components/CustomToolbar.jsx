import propertyService from '@/services/propertyService';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';

const CustomToolbar = ({
  selectedRows,
  setSelectedRows,
  properties,
  deleteProperties,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleRowsDelete = async () => {
    const idsToDelete = selectedRows.data.map(
      (d) => properties[d.dataIndex].property_id
    );
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

  return (
    <div>
      <Button onClick={handleRowsDelete} variant="contained" color="secondary">
        Delete Selected Rows
      </Button>
    </div>
  );
};

export default CustomToolbar;
