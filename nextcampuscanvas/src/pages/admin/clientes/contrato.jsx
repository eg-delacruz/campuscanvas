import { Document, Page, View, Text, PDFViewer } from '@react-pdf/renderer';
import { useState, useEffect } from 'react';

const contrato = (contract) => {
  //TODO:
  // FIRST: Check if pdf library works, and if it shows a pdf viewer!!
  // - Secure route
  // - Create global state
  // - Redirect to nuevo-contrato if there is no contract info in global state
  // - Only use the web pdf viewer and see if it is possible to download from it
  // - Clean info sent to API (leave only needed info)
  // - Delete unused libraries on API and in nuevo-contrato.jsx
  // - Delete unnecessary code on API
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && (
        <div style={{ minHeight: '100vh' }}>
          <PDFViewer style={{ width: '100%', height: '100vh' }}>
            <Document>
              <Page size={'A4'}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontSize: '42px',
                      fontWeight: 'bold',
                      marginBottom: '20px',
                    }}
                  >
                    Aquí se mostrará el contrato si en el estado global está la
                    info. Si no, redirect
                  </Text>

                  <Text>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Suscipit mollitia recusandae corporis voluptates reiciendis
                    obcaecati facere? Quas rerum itaque iusto laborum
                    repellendus esse, eius pariatur veritatis odit aliquam
                    impedit non? Lorem ipsum dolor sit amet consectetur,
                    adipisicing elit. Suscipit mollitia recusandae corporis
                    voluptates reiciendis obcaecati facere? Quas rerum itaque
                    iusto laborum repellendus esse, eius pariatur veritatis odit
                    aliquam impedit non? Lorem ipsum dolor sit amet consectetur,
                    adipisicing elit. Suscipit mollitia recusandae corporis
                    voluptates reiciendis obcaecati facere? Quas rerum itaque
                    iusto laborum repellendus esse, eius pariatur veritatis odit
                    aliquam impedit non? Lorem ipsum dolor sit amet consectetur,
                    adipisicing elit. Suscipit mollitia recusandae corporis
                    voluptates reiciendis obcaecati facere? Quas rerum itaque
                    iusto laborum repellendus esse, eius pariatur veritatis odit
                    aliquam impedit non? Lorem ipsum dolor sit amet consectetur,
                    adipisicing elit. Suscipit mollitia recusandae corporis
                    voluptates reiciendis obcaecati facere? Quas rerum itaque
                    iusto laborum repellendus esse, eius pariatur veritatis odit
                    aliquam impedit non? Lorem ipsum dolor sit amet consectetur,
                    adipisicing elit. Suscipit mollitia recusandae corporis
                    voluptates reiciendis obcaecati facere? Quas rerum itaque
                    iusto laborum repellendus esse, eius pariatur veritatis odit
                    aliquam impedit non? Lorem ipsum dolor sit amet consectetur,
                    adipisicing elit. Suscipit mollitia recusandae corporis
                    voluptates reiciendis obcaecati facere? Quas rerum itaque
                    iusto laborum repellendus esse, eius pariatur veritatis odit
                    aliquam impedit non? Lorem ipsum dolor sit amet consectetur,
                    adipisicing elit. Suscipit mollitia recusandae corporis
                    voluptates reiciendis obcaecati facere? Quas rerum itaque
                    iusto laborum repellendus esse, eius pariatur veritatis odit
                    aliquam impedit non? aliquam impedit non? Lorem ipsum dolor
                    sit amet consectetur, adipisicing elit. Suscipit mollitia
                    recusandae corporis voluptates reiciendis obcaecati facere?
                    Quas rerum itaque iusto laborum repellendus esse, eius
                    pariatur veritatis odit aliquam impedit non? aliquam impedit
                    non? Lorem ipsum dolor sit amet consectetur, adipisicing
                    elit. Suscipit mollitia recusandae corporis voluptates
                    reiciendis obcaecati facere? Quas rerum itaque iusto laborum
                    repellendus esse, eius pariatur veritatis odit aliquam
                    impedit non? aliquam impedit non? Lorem ipsum dolor sit amet
                    consectetur, adipisicing elit. Suscipit mollitia recusandae
                    corporis voluptates reiciendis obcaecati facere? Quas rerum
                    itaque iusto laborum repellendus esse, eius pariatur
                    veritatis odit aliquam impedit non? aliquam impedit non?
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Suscipit mollitia recusandae corporis voluptates reiciendis
                    obcaecati facere? Quas rerum itaque iusto laborum
                    repellendus esse, eius pariatur veritatis odit aliquam
                    impedit non? aliquam impedit non? Lorem ipsum dolor sit amet
                    consectetur, adipisicing elit. Suscipit mollitia recusandae
                    corporis voluptates reiciendis obcaecati facere? Quas rerum
                    itaque iusto laborum repellendus esse, eius pariatur
                    veritatis odit aliquam impedit non? aliquam impedit non?
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Suscipit mollitia recusandae corporis voluptates reiciendis
                    obcaecati facere? Quas rerum itaque iusto laborum
                    repellendus esse, eius pariatur veritatis odit aliquam
                    impedit non?
                  </Text>
                </View>
              </Page>
            </Document>
          </PDFViewer>
        </div>
      )}
    </>
  );
};

export default contrato;
