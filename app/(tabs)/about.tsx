import { View, Text, StyleSheet } from 'react-native';

export default function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sobre Mim</Text>
      <View style={styles.card}>
        <Text style={styles.name}>Arthur Vinícius Moreira da Silva</Text>
        <Text style={styles.info}>Sistemas para Internet | UNICAP</Text>
        <Text style={styles.info}>Desenvolvedor React Native</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#0F172A' },
  title: { fontSize: 24, color: '#F8FAFC', fontWeight: 'bold', marginBottom: 20 },
  card: { backgroundColor: '#1E293B', padding: 20, borderRadius: 12, borderColor: '#334155', borderWidth: 1 },
  name: { fontSize: 20, color: '#38BDF8', fontWeight: 'bold', marginBottom: 10 },
  info: { fontSize: 16, color: '#CBD5E1', marginBottom: 5 }
});