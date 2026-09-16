import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import Dado from "./components/Dado";

export default function Index() {
  
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
    if (placar.j2 > placar.j1) return "Vencedor : Jogador 2!!";
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
              {dadoJ1[0] + dadoJ1[1] > 0 ? `Soma: ${dadoJ1[0] + dadoJ1[1]}` : "---"}
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
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  roundText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#555',
  },
  playersContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20, 
    marginBottom: 20,
  },
  playerCard: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    minWidth: 120,
  },
  playerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  scoreText: {
    fontSize: 14,
    marginBottom: 10,
  },
  somaJ1Container: {
    marginTop: 10,
  },
  somaJ1Text: {
    fontWeight: 'bold',
    color: '#2563eb',
    fontSize: 18,
  },
  somaJ2Container: {
    marginTop: 10,
  },
  somaJ2Text: {
    fontWeight: 'bold',
    color: 'red',
    fontSize: 18,
  },
  buttonBase: {
    marginTop: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonJ1: {
    backgroundColor: 'transparent',
    borderColor: '#3b82f6',
  },
  buttonTextJ1: {
    color: '#1d4ed8',
    fontWeight: '600',
  },
  buttonJ2: {
    backgroundColor: 'transparent',
    borderColor: '#ef4444',
  },
  buttonTextJ2: {
    color: '#b91c1c',
    fontWeight: '600',
  },
  buttonReset: {
    backgroundColor: 'transparent',
    borderColor: '#000',
  },
  buttonTextReset: {
    color: '#000',
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.5,
  },
  footerContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  winnerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  roundResultText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});