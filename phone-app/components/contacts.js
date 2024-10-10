import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, StyleSheet, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import * as Contacts from 'expo-contacts';
import { Linking } from 'react-native';

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const getContacts = async () => {
      try {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
          const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers],
          });
          if (data.length > 0) {
            setContacts(data);
          }
        } else {
          console.log('Permission denied');
        }
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    getContacts();
  }, []);

  const handleCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`)
      .catch((err) => Alert.alert('Error', 'Unable to make a call.'));
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.contactItem} onPress={() => item.phoneNumbers.length > 0 ? handleCall(item.phoneNumbers[0].number) : null}>
      <Text style={styles.contactName}>{item.displayName}</Text>
      <Text>{item.phoneNumbers.length > 0 ? item.phoneNumbers[0].number : 'No Phone Number'}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  contactItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ContactsPage;
