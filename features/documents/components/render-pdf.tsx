import { Document, Page, Text, View } from '@react-pdf/renderer';
import React from 'react';

export const RenderPdf = () => {
  return (
    <Document author="Diego" title={`Testing ${new Date().getFullYear()}`}>
      <Page size="A4">
        <View>
          <Text>Section #1</Text>
        </View>
      </Page>
    </Document>
  );
};
