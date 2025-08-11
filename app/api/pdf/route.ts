import { NextRequest, NextResponse } from 'next/server';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 32 },
  h1: { fontSize: 18, marginBottom: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  label: { fontSize: 10, color: '#666' },
  tableHeader: { flexDirection: 'row', borderBottomWidth: 1, paddingBottom: 4, marginTop: 12 },
  th: { width: '25%', fontSize: 10, fontWeight: 700 },
  tr: { flexDirection: 'row', borderBottomWidth: 0.5, paddingVertical: 4 },
  td: { width: '25%', fontSize: 10 },
  totals: { alignSelf: 'flex-end', marginTop: 12, width: '50%' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', fontSize: 12 }
});

function InvoicePDF({inv}: any){
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.h1}>{inv.title} — {inv.number}</Text>
        <View style={styles.row}>
          <View>
            <Text style={styles.label}>Emisor</Text>
            <Text>{inv.seller.name}</Text>
            <Text>{inv.seller.taxId}</Text>
            <Text>{inv.seller.address || ''}</Text>
          </View>
          <View>
            <Text style={styles.label}>Cliente</Text>
            <Text>{inv.buyer.name}</Text>
            <Text>{inv.buyer.address || ''}</Text>
          </View>
        </View>

        <View style={styles.tableHeader}>
          <Text style={styles.th}>Concepto</Text>
          <Text style={styles.th}>Cant.</Text>
          <Text style={styles.th}>Precio</Text>
          <Text style={styles.th}>IVA</Text>
        </View>
        {inv.items.map((it:any, idx:number)=>(
          <View key={idx} style={styles.tr}>
            <Text style={styles.td}>{it.description}</Text>
            <Text style={styles.td}>{it.qty}</Text>
            <Text style={styles.td}>{it.price.toFixed(2)} €</Text>
            <Text style={styles.td}>{it.tax}%</Text>
          </View>
        ))}

        <View style={styles.totals}>
          <View style={styles.totalRow}><Text>Subtotal</Text><Text>{inv.subtotal.toFixed(2)} €</Text></View>
          <View style={styles.totalRow}><Text>IVA</Text><Text>{inv.taxTotal.toFixed(2)} €</Text></View>
          <View style={styles.totalRow}><Text>Total</Text><Text>{inv.total.toFixed(2)} €</Text></View>
        </View>
      </Page>
    </Document>
  );
}

export async function POST(req: NextRequest){
  const inv = await req.json();
  const ReactPDF = await import('@react-pdf/renderer');
  const pdfStream = await ReactPDF.pdf(<InvoicePDF inv={inv}/>).toBuffer();
  return new NextResponse(pdfStream, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${inv.number}.pdf"`
    }
  });
}
