import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContactsPage from '../phone-app/components/contacts';

const Stack = createNativeStackNavigator();

function Contacts() {
  return (
      <ContactsPage />
  );
}

export default Contacts;
