import React, { useState } from "react";
import {
  Box,
  Fab,
  Modal,
  Typography,
  IconButton,
  InputBase,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";

const AddButtonModal = () => {
  const [open, setOpen] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [error, setError] = useState(false);
  const [precio, setPrecio] = useState(null);

  const handleOpen = () => {
    setOpen(true);
    setTextValue("");
    setError(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTextChange = (event) => {
    const value = event.target.value;
    setTextValue(value);
    setError(false);
  };

  const handleSearch = () => {
    const urlPattern = /^https:\/\/www\.idealista\.com\/inmueble\/\d+\/$/;

    if (urlPattern.test(textValue)) {
      setOpen(false);
    } else {
      setError(true);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  // Crear una instancia de XMLHttpRequest
  var xhr = new XMLHttpRequest();

  // Configurar la solicitud GET
  xhr.open("GET", "https://cors-anywhere.herokuapp.com/corsdemo/https://www.idealista.com/inmueble/103018393/", true);

  // Configurar el manejo de la respuesta
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      // La solicitud fue exitosa, manejar la respuesta aquí
      setPrecio(obtenerPrecioDesdeHTML(xhr.responseText));
      console.log("Precio:", precio);
    } else {
      // La solicitud falló, manejar el error aquí
      console.error("Error al realizar la solicitud:", xhr.statusText);
    }
  };

  // Configurar el manejo de errores de red
  xhr.onerror = function () {
    console.error("Error de red al realizar la solicitud");
  };

  // Enviar la solicitud
  xhr.send();

  // Función para extraer el precio del HTML
  function obtenerPrecioDesdeHTML(html) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(html, "text/html");
    var precioElemento = doc.querySelector(
      "div.info-data span.info-data-price"
    );
    return precioElemento ? precioElemento.textContent : null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        marginTop: "10px",
        p: 0,
      }}
    >
      <Fab color="primary" aria-label="add" onClick={handleOpen}>
        <AddIcon />
      </Fab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              bgcolor: "background.paper",
              p: 2,
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <IconButton onClick={handleClose} sx={{ ml: 1 }}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Typography
                sx={{ flex: 1 }}
                id="modal-modal-title"
                variant="h6"
                component="h2"
              >
                Introduce la URL
              </Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <InputBase
                sx={{ flex: 1 }}
                variant="outlined"
                value={textValue}
                onChange={handleTextChange}
                onKeyPress={handleKeyPress}
                placeholder="Introduce la URL"
                inputProps={{ "aria-label": "Introduce la URL" }}
              />
              <IconButton
                type="button"
                sx={{ p: "10px" }}
                aria-label="search"
                onClick={handleSearch}
              >
                <SearchIcon />
              </IconButton>
            </Box>
            {error && (
              <Typography sx={{ color: "red", fontSize: "0.8rem" }}>
                La URL debe tener el formato correcto
              </Typography>
            )}
            <div>
              {precio ? (
                <p>Precio del inmueble: {precio}</p>
              ) : (
                <p>Cargando...</p>
              )}
            </div>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default AddButtonModal;
