import useProperties from '@/hooks/useProperties';
import propertyService from '@/services/propertyService';
import parser from '@/utils/parser';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PublicOffIcon from '@mui/icons-material/PublicOff';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';

export const Columns = (handleOpenDialog) => {
  const { enqueueSnackbar } = useSnackbar();
  const { revokeShareProperty } = useProperties();
  const { t } = useTranslation();

  const handlePrivateProperty = async (propertyId) => {
    try {
      const res = await propertyService.revokeShareProperty(propertyId);
      if (res.status === 200) {
        enqueueSnackbar(t('revoke.success'), {
          variant: 'success',
        });
        revokeShareProperty(res.data);
      } else {
        throw new Error('Failed to revoke share property');
      }
    } catch (error) {
      enqueueSnackbar(t('revoke.error'), { variant: 'error' });
      console.error('Error revoking share property:', error);
    }
  };

  const handleCopyToClipboard = (e, url) => {
    if (e) e.preventDefault();

    const urlToCopy = parser.getFullURL(url);

    navigator.clipboard
      .writeText(urlToCopy)
      .then(() => {
        enqueueSnackbar(t('property-share.generator.success-copy'), {
          variant: 'info',
        });
      })
      .catch((error) => {
        enqueueSnackbar(t('property-share.generator.fail-copy'), {
          variant: 'error',
        });
        console.warn(error);
      });
  };

  return [
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
      options: {
        filter: false,
      },
    },
    {
      name: 'share_url',
      label: 'URL',
      options: {
        filter: true,
        setCellHeaderProps: () => ({
          style: {
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
          },
        }),

        customFilterListOptions: { render: (v) => `Url: ${v}` },
        filterOptions: {
          renderValue: (v) =>
            v ? v.replace(/^(\w).* (.*)$/, '$1. $2') : 'vacío',
        },
        customBodyRender: (value) => {
          return value == '❌' ? (
            value
          ) : (
            <Tooltip title="Copiar URL">
              <Button
                onClick={(e) => handleCopyToClipboard(e, value)}
                size="small"
                variant="text"
                endIcon={<ContentCopyIcon />}
              >
                {value == '❌' ? value : `/${value}`}
              </Button>
            </Tooltip>
          );
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
          return (
            <IconButton
              aria-label="make-private"
              disabled={!value}
              size="small"
              color="error"
              onClick={() =>
                handleOpenDialog(
                  {
                    title: 'Make private property',
                    message: `Are you sure you want to make private this property ${propertyId}?`,
                  },

                  () => handlePrivateProperty(propertyId)
                )
              }
            >
              <Tooltip title="Hacer privada">
                <PublicOffIcon />
              </Tooltip>
            </IconButton>
          );
        },
      },
    },
    {
      name: 'created_at',
      label: 'Fecha de creación',
      options: { filter: true, sort: true, options: { sortDirection: 'desc' } },
    },
  ];
};

export const createRows = (data) => {
  return data.map(
    ({ property_id, title, location, share_url, created_at, is_shared }) => ({
      property_id,
      title,
      location,
      share_url: !share_url ? '❌' : `${share_url}`,
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
