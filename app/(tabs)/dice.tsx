import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import Dado from "../components/Dado"; 

export default function DiceGame() {
  const [rodada, setRodada] = useState(1);
  const [placar, setPlacar] = useState({ j1: 0, j2: 0 });
  const [turno, setTurno] = useState('J1');
  const [dadoJ1, setDadoJ1] = useState([0, 0]);
  const [dadoJ2, setDadoJ2] = useState([0, 0]);
  const [resultadoRodada, setResultadoRodada] = useState("");

  const jogadorUm = () => {
    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;
    setDadoJ1([d1, d2]);
    setDadoJ2([0, 0]); 
    setResultadoRodada("Vez do Jogador 2");
    setTurno('J2');
  };

  const jogadorDois = () => {
    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;
    setDadoJ2([d1, d2]);

    const somaJ1 = dadoJ1[0] + dadoJ1[1]; 
    const somaJ2 = d1 + d2;

    let novoPlacar = { ...placar };
    if (somaJ1 > somaJ2) {
      novoPlacar.j1++;
      setResultadoRodada("Jogador 1 venceu a rodada!");
    } else if (somaJ2 > somaJ1) {
      novoPlacar.j2++;
      setResultadoRodada("Jogador 2 venceu a rodada!");
    } else {
      setResultadoRodada("A rodada empatou!");
    }
    
    setPlacar(novoPlacar);

    if (rodada === 5) {
      setTurno('FIM');
    } else {
      setTurno('ESPERA'); 
      setTimeout(() => {
        setRodada(prev => prev + 1);
        setTurno('J1');
      }, 1500);
    }
  };

  const reiniciarJogo = () => {
    setRodada(1);
    setTurno('J1');
    setPlacar({ j1: 0, j2: 0 });
    setDadoJ1([0, 0]);
    setDadoJ2([0, 0]);
    setResultadoRodada("");
  };

  const getVencedorGeral = () => {
    if (placar.j1 > placar.j2) return "Vencedor: Jogador 1!!";
    if (placar.j2 > placar.j1) return "Vencedor: Jogador 2!!";
    return "Empate!!";
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Batalha de Dados</Text>
      <Text style={styles.roundText}>Rodada: {rodada} de 5</Text>
      
      <View style={styles.playersContainer}>
        <View style={styles.playerCard}>
          <Text style={styles.playerTitle}>Jogador 1</Text>
          <Text style={styles.scoreText}>Placar: {placar.j1}</Text>
          
          <Dado valor={dadoJ1[0]} />
          <Dado valor={dadoJ1[1]} />

          <View style={styles.somaJ1Container}>
            <Text style={styles.somaJ1Text}>
              {dadoJ1[0] + dadoJ1[1] > 0 ? `Soma: ${dadoJ1[0] + dadoJ1[1]}` : "---"}
            </Text>
          </View>

          <TouchableOpacity 
            style={[
              styles.buttonBase, 
              styles.buttonJ1, 
              turno !== 'J1' && styles.disabledButton
            ]} 
            disabled={turno !== 'J1'} 
            onPress={jogadorUm}
          >
            <Text style={styles.buttonTextJ1}>Jogar J1</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.playerCard}>
          <Text style={styles.playerTitle}>Jogador 2</Text>
          <Text style={styles.scoreText}>Placar: {placar.j2}</Text>
          
          <Dado valor={dadoJ2[0]} />
          <Dado valor={dadoJ2[1]} />

          <View style={styles.somaJ2Container}>
            <Text style={styles.somaJ2Text}>
              {dadoJ2[0] + dadoJ2[1] > 0 ? `Soma: ${dadoJ2[0] + dadoJ2[1]}` : "---"}
            </Text>
          </View>

          <TouchableOpacity 
            style={[
              styles.buttonBase, 
              styles.buttonJ2, 
              turno !== 'J2' && styles.disabledButton
            ]} 
            disabled={turno !== 'J2'} 
            onPress={jogadorDois}
          >
            <Text style={styles.buttonTextJ2}>Jogar J2</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footerContainer}>
        {turno === 'FIM' ? (
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.winnerText}>{getVencedorGeral()}</Text>
            <TouchableOpacity 
              style={[styles.buttonBase, styles.buttonReset]} 
              onPress={reiniciarJogo}
            >
              <Text style={styles.buttonTextReset}>JOGAR NOVAMENTE</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.roundResultText}>
            {resultadoRodada || "Clique em J1 para começar!"}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#0F172A', 
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#F8FAFC',
  },
  roundText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#94A3B8',
  },
  playersContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20, 
    marginBottom: 20,
  },
  playerCard: {
    borderWidth: 1,
    borderColor: '#334155',
    backgroundColor: '#1E293B',
    padding: 15,
    alignItems: 'center',
    borderRadius: 12,
    minWidth: 140,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  playerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#F8FAFC',
  },
  scoreText: {
    fontSize: 14,
    marginBottom: 10,
    color: '#CBD5E1',
  },
  somaJ1Container: {
    marginTop: 10,
  },
  somaJ1Text: {
    fontWeight: 'bold',
    color: '#38BDF8', 
    fontSize: 18,
  },
  somaJ2Container: {
    marginTop: 10,
  },
  somaJ2Text: {
    fontWeight: 'bold',
    color: '#F43F5E', 
    fontSize: 18,
  },
  buttonBase: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  buttonJ1: {
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    borderColor: '#38BDF8',
  },
  buttonTextJ1: {
    color: '#38BDF8',
    fontWeight: 'bold',
  },
  buttonJ2: {
    backgroundColor: 'rgba(244, 63, 94, 0.1)',
    borderColor: '#F43F5E',
  },
  buttonTextJ2: {
    color: '#F43F5E',
    fontWeight: 'bold',
  },
  buttonReset: {
    backgroundColor: '#FF7F50', 
    borderColor: '#FF7F50',
    paddingHorizontal: 30,
  },
  buttonTextReset: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  disabledButton: {
    opacity: 0.3,
  },
  footerContainer: {
    marginTop: 20,
    alignItems: 'center',
    height: 60, 
    justifyContent: 'center',
  },
  winnerText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#FF7F50',
  },
  roundResultText: {
    fontWeight: '500',
    fontSize: 18,
    color: '#F8FAFC',
  },
});