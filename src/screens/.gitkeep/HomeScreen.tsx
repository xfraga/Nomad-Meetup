import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Nomad {
  id: string;
  name: string;
  distance: string;
  skills: string[];
}

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();

  // Placeholder data for nearby nomads
  const nearbyNomads: Nomad[] = [
    { id: '1', name: 'John Doe', distance: '0.5 km', skills: ['React', 'Node.js'] },
    { id: '2', name: 'Jane Smith', distance: '1.2 km', skills: ['Python', 'Django'] },
    { id: '3', name: 'Mike Johnson', distance: '2.3 km', skills: ['Java', 'Spring'] },
  ];

  const renderNomadItem = ({ item }: { item: Nomad }) => (
    <TouchableOpacity style={styles.nomadCard}>
      <View style={styles.nomadInfo}>
        <Text style={styles.nomadName}>{item.name}</Text>
        <Text style={styles.nomadDistance}>{item.distance} away</Text>
        <View style={styles.skillsContainer}>
          {item.skills.map((skill, index) => (
            <View key={index} style={styles.skillTag}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Nomad Meetup</Text>
        <Text style={styles.subtitle}>Welcome to your digital nomad community</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby Nomads</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Map' as never)}>
            <Text style={styles.viewMapLink}>View on Map</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={nearbyNomads}
          renderItem={renderNomadItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Profile' as never)}
        >
          <Text style={styles.navButtonText}>Go to Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#6200ee',
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#e0e0e0',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  viewMapLink: {
    fontSize: 14,
    color: '#6200ee',
    fontWeight: '600',
  },
  listContainer: {
    paddingBottom: 16,
  },
  nomadCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nomadInfo: {
    flex: 1,
  },
  nomadName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  nomadDistance: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  skillTag: {
    backgroundColor: '#e8eaf6',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 4,
  },
  skillText: {
    fontSize: 12,
    color: '#6200ee',
    fontWeight: '500',
  },
  bottomNav: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  navButton: {
    backgroundColor: '#6200ee',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  navButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;