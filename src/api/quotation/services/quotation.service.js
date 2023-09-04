"use strict";
const axios = require("axios");
const FormData = require("form-data");

/**
 * @param {any} pdfVoucherId
 */
async function deletePdf(pdfVoucherId) {
  const requestPdfCloudinary = {
    method: "DELETE",
    url: `${process.env.API_URL}/api/upload/files/${pdfVoucherId}`,
    headers: {
      Authorization: `Bearer ${process.env.CLIENT_API_TOKEN}`,
    },
  };

  try {
    // @ts-ignore
    const uploadDeleteResponse = await axios(requestPdfCloudinary);
    if (uploadDeleteResponse.status !== 200) {
      throw new Error("Error al eliminar el archivo");
    }
    return uploadDeleteResponse;
  } catch (error) {
    throw new Error("Error al eliminar el archivo");
  }
}

/**
 * @param {any} fileContent
 * @param {any} quotationNumber
 */
async function postPdf(fileContent, quotationNumber) {
  const formdata = new FormData();
  formdata.append("files", fileContent, `${quotationNumber}.pdf`);
  const requestOptions = {
    method: "post",
    url: `${process.env.API_URL}/api/upload`,
    headers: {
      Authorization: `Bearer ${process.env.CLIENT_API_TOKEN}`,
      ...formdata.getHeaders(),
    },
    data: formdata,
  };

  // @ts-ignore
  const uploadResponse = await axios(requestOptions);

  if (uploadResponse.status !== 200) {
    throw new Error("Error al subir el archivo");
  }
  return uploadResponse.data[0];
}

/**
 * @param {any} id
 */
async function senMessage(id) {
  const message = {
    notification: {
      title: "Nueva cotización",
      body: `Código: ${id}`,
    },
    data: {
      screen: "/",
    },
    to: `${process.env.MESSAGE_APP_TOKEN}`,
  };
  const requestOptions = {
    method: "post",
    url: `${process.env.MESSAGE_API_URL}`,
    headers: {
      Authorization: `Bearer ${process.env.MESSAGE_API_TOKEN}`,
    },
    data: message,
  };

  // @ts-ignore
  const sendMessageRes = await axios(requestOptions);

  if (sendMessageRes.status !== 200) {
    throw new Error("Error al enviar la notificación");
  }
  console.log("message", message);

  console.log("sendMessageRes.data ", sendMessageRes.data);
  return sendMessageRes.data;
}

module.exports = { deletePdf, postPdf, senMessage };
