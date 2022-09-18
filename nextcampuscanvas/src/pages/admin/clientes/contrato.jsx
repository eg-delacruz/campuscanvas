//See https://www.youtube.com/watch?v=D05ptoe7brY
import {
  Document,
  Page,
  View,
  Text,
  PDFViewer,
  StyleSheet,
  Font,
  Image,
} from '@react-pdf/renderer';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

//Session
import { useSession } from 'next-auth/react';

//Fonts
import regularOpenSans from '@assets/Fonts/OpenSans-Regular.ttf';
import italicOpenSans from '@assets/Fonts/OpenSans-Italic.ttf';
import boldOpenSans from '@assets/Fonts/OpenSans-Bold.ttf';
import regularPoppins from '@assets/Fonts/Poppins-Regular.ttf';
import italicPoppins from '@assets/Fonts/Poppins-Italic.ttf';
import boldPoppins from '@assets/Fonts/Poppins-Bold.ttf';

const contrato = () => {
  const [state, setState] = useState({
    submitLoading: false,
    error: null,
  });
  const [isClient, setIsClient] = useState(false);
  const [contract, setContract] = useState({});

  //Session
  const { data: session, status } = useSession();

  const router = useRouter();

  //Securing route (start)
  if (status === 'unauthenticated') {
    router.push('/auth/login');
  }
  if (session) {
    if (
      !(
        session?.token.role === 'super_admin' || session?.token.role === 'admin'
      )
    ) {
      router.push('/');
    }
  }

  useEffect(() => {
    if (
      session?.token.role === 'super_admin' ||
      session?.token.role === 'admin'
    ) {
      setState({ ...state, loading: false });
    }
  }, [session]);

  //Securing route (end)

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const string_contract = localStorage.getItem('DATA');
      const CONTRACT = JSON.parse(string_contract);
      setContract(CONTRACT);
    }
  }, [isClient]);

  //////////////////////////Styles start //////////////////////////////
  Font.register({
    family: 'Open Sans',
    src: regularOpenSans,
  });

  Font.register({
    family: 'Open Sans Italic',
    src: italicOpenSans,
  });
  Font.register({
    family: 'Open Sans Bold',
    src: boldOpenSans,
  });
  Font.register({
    family: 'Poppins',
    src: regularPoppins,
  });
  Font.register({
    family: 'Poppins Bold',
    src: boldPoppins,
  });
  Font.register({
    family: 'Poppins Italic',
    src: italicPoppins,
  });

  const styles = StyleSheet.create({
    document_content: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 50,
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: 'right',
    },
    footer: {
      // display: 'flex',
      // justifyContent: 'center',
      // alignItems: 'center',
      position: 'absolute',
      bottom: 30,
      left: 0,
      right: 0,
      paddingHorizontal: 50,
      fontSize: 12,
    },
    footerContainer: {
      // display: 'flex',
      // justifyContent: 'space-between',
      // width: '100%',
    },
    pageNumber: {
      fontSize: 12,
      textAlign: 'center',
    },
    footerLogo: {
      marginLeft: 'auto',
    },
    bold_open_sans_test: {
      fontFamily: 'Open Sans Bold',
    },
    cover_title: {
      fontFamily: 'Poppins Bold',
      fontSize: 50,
    },
  });

  //////////////////////////Styles end //////////////////////////////
  console.log(contract);
  return (
    <>
      {isClient && (
        <div style={{ minHeight: '100vh' }}>
          <PDFViewer style={{ width: '100%', height: '100vh' }}>
            <Document>
              <Page size={'A4'} style={styles.document_content}>
                <Text style={styles.header} fixed>
                  <Text style={styles.bold_open_sans_test}>No. contrato: </Text>
                  {contract.contrato?.numero_contrato}
                </Text>
                <Text style={styles.cover_title}>
                  No. Contrato: {contract.contrato?.numero_contrato}
                </Text>

                <Text>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Suscipit mollitia recusandae corporis voluptates reiciendis
                  obcaecati facere? Quas rerum itaque iusto laborum repellendus
                  esse, eius pariatur veritatis odit aliquam impedit non? Lorem
                  ipsum dolor sit amet consectetur, adipisicing elit. Suscipit
                  mollitia recusandae corporis voluptates reiciendis obcaecati
                  facere? Quas rerum itaque iusto laborum repellendus esse, eius
                  pariatur veritatis odit aliquam impedit non? Lorem ipsum dolor
                  sit amet consectetur, adipisicing elit. Suscipit mollitia
                  recusandae corporis voluptates reiciendis obcaecati facere?
                  Quas rerum itaque iusto laborum repellendus esse, eius
                  pariatur veritatis odit aliquam impedit non? Lorem ipsum dolor
                  sit amet consectetur, adipisicing elit. Suscipit mollitia
                  recusandae corporis voluptates reiciendis obcaecati facere?
                  Quas rerum itaque iusto laborum repellendus esse, eius
                  pariatur veritatis odit aliquam impedit non? Lorem ipsum dolor
                  sit amet consectetur, adipisicing elit. Suscipit mollitia
                  recusandae corporis voluptates reiciendis obcaecati facere?
                  Quas rerum itaque iusto laborum repellendus esse, eius
                  pariatur veritatis odit aliquam impedit non? Lorem ipsum dolor
                  sit amet consectetur, adipisicing elit. Suscipit mollitia
                  recusandae corporis voluptates reiciendis obcaecati facere?
                  Quas rerum itaque iusto laborum repellendus esse, eius
                  pariatur veritatis odit aliquam impedit non? Lorem ipsum dolor
                  sit amet consectetur, adipisicing elit. Suscipit mollitia
                  recusandae corporis voluptates reiciendis obcaecati facere?
                  Quas rerum itaque iusto laborum repellendus esse, eius
                  pariatur veritatis odit aliquam impedit non? Lorem ipsum dolor
                  sit amet consectetur, adipisicing elit. Suscipit mollitia
                  recusandae corporis voluptates reiciendis obcaecati facere?
                  Quas rerum itaque iusto laborum repellendus esse, eius
                  pariatur veritatis odit aliquam impedit non? aliquam impedit
                  non? Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Suscipit mollitia recusandae corporis voluptates reiciendis
                  obcaecati facere? Quas rerum itaque iusto laborum repellendus
                  esse, eius pariatur veritatis odit aliquam impedit non?
                  aliquam impedit non? Lorem ipsum dolor sit amet consectetur,
                  adipisicing elit. Suscipit mollitia recusandae corporis
                  voluptates reiciendis obcaecati facere? Quas rerum itaque
                  iusto laborum repellendus esse, eius pariatur veritatis odit
                  aliquam impedit non? aliquam impedit non? Lorem ipsum dolor
                  sit amet consectetur, adipisicing elit. Suscipit mollitia
                  recusandae corporis voluptates reiciendis obcaecati facere?
                  Quas rerum itaque iusto laborum repellendus esse, eius
                  pariatur veritatis odit aliquam impedit non? aliquam impedit
                  non? Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Suscipit mollitia recusandae corporis voluptates reiciendis
                  obcaecati facere? Quas rerum itaque iusto laborum repellendus
                  esse, eius pariatur veritatis odit aliquam impedit non?
                  aliquam impedit non? Lorem ipsum dolor sit amet consectetur,
                  adipisicing elit. Suscipit mollitia recusandae corporis
                  voluptates reiciendis obcaecati facere? Quas rerum itaque
                  iusto laborum repellendus esse, eius pariatur veritatis odit
                  aliquam impedit non? aliquam impedit non? Lorem ipsum dolor
                  sit amet consectetur, adipisicing elit. Suscipit mollitia
                  recusandae corporis voluptates reiciendis obcaecati facere?
                  Quas rerum itaque iusto laborum repellendus esse, eius
                  pariatur veritatis odit aliquam impedit non?
                </Text>
                <Image
                  src='https://i.imgur.com/pOdDmpi.png'
                  style={{ maxWidth: '100px' }}
                />
                <Text
                  fixed
                  style={styles.footer}
                  render={({ pageNumber, totalPages }) => {
                    if (pageNumber === 1) {
                      return ``;
                    }
                    return (
                      <Text
                        style={{
                          fontSize: 12,
                          textAlign: 'center',
                        }}
                      >
                        {pageNumber}
                      </Text>
                    );
                  }}
                />
              </Page>
            </Document>
          </PDFViewer>
        </div>
      )}
    </>
  );
};

export default contrato;
