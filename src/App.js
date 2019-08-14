import React, { useState } from 'react';
import { Dropdown, Button } from 'semantic-ui-react'
import './App.css'
import 'semantic-ui-css/semantic.min.css'

export default function App() {
    const [conjuntoQ, setConjuntoQ] = useState([]);
    const [palavraInicial, setPalavraInicial] = useState([]);
    const [alfabeto, setAlfabeto] = useState('');
    const [estadoInicial, setEstadoInicial] = useState('');
    const [vazio, setVazio] = useState('');
    const [estadoFinal, setEstadoFinal] = useState('');

    // dropdown
    const [optionsEstados, setOptionsEstados] = useState([]);
    const [optionsLetras, setOptionsLetras] = useState([]);

    const optionsTuringMachine = [
        {'key': 1, 'text': 'L', 'value': 1},
        {'key': 2, 'text': 'R', 'value': 2},
        {'key': 3, 'text': 'S', 'value': 3}
    ]

    // quantidade de transições
    const [transicoes, setTransicoes] = useState(1);

    // estado inicial da transição
    const [estadoIncialTransicao, setEstadoIncialTransicao] = useState([]);

    // letra inicial da transição
    const [letraIncialTransicao, setLetraIncialTransicao] = useState([]);

    // estado final da transição
    const [letraFinalTransicao, setLetraFinalTransicao] = useState([]);

    // letra a ser substituida
    const [letraSubstituicao, setLetraSubstituicao] = useState([]);

    // Right, Left ou Stop
    const [direcao, setDirecao] = useState([]);
    
    // bool error
    const [error, setError] = useState(true);

    // mensagem de erro
    const [errorMessage, setErrorMessage] = useState([]);

    const [boolEstadoInicial, setBoolEstadoInicial] = useState(false);
    const [boolEstadoFinal, setBoolEstadoFinal] = useState(false);

    async function handleConfiguracao(e) {
        e.preventDefault();

        const arrayEstados = conjuntoQ.split(',');
        const arrayAlfabeto = alfabeto.split(',');
        const arrayLetrasPalavraInicial = palavraInicial.split('');

        // verifica se todas as letras da palavra pertencem ao alfabeto
        const check = arrayLetrasPalavraInicial.every(v => arrayAlfabeto.includes(v));
        
        // verifica se estado inicial e final pertencem ao conjunto
        const boolEI = arrayEstados.includes(estadoInicial);
        const boolEF = arrayEstados.includes(estadoFinal);
        
        if (check && boolEI && boolEF) {
            await setError(false);

            var count = 1
            const array = []
            arrayEstados.forEach(element => {
                var obj = {
                    'key': count,
                    'text': element,
                    'value': count
                };
                array.push(obj);
                count++;
            });
            await setOptionsEstados(array)

            var count2 = 1;
            var array2 = [];
            arrayAlfabeto.forEach(element => {
                var obj = {
                    'key': count2,
                    'text': element,
                    'value': count2
                };
                array2.push(obj);
            });
            await setOptionsLetras(array2);
        } else {
            await setError(true);
        }
    }

    return (
        <div>
            <ul className="two-containers">
                <li>
                    <div className="configuracoes-container">
                        <form onSubmit={handleConfiguracao}>
                            <ul className="configuracoes-maquina">
                                <li>
                                    <label>Conjunto Q</label>
                                    <input
                                        className={`input ${1 && 'is-danger'}`}
                                        placeholder="q0,q1,q2....q7"
                                        value={conjuntoQ}
                                        onChange={e => setConjuntoQ(e.target.value)}
                                    />
                                </li>
                                <li>
                                    <label>Palavra inicial ε</label>
                                    <input
                                        placeholder="Palavra inicial"
                                        value={palavraInicial}
                                        onChange={e => setPalavraInicial(e.target.value)}
                                    />
                                </li>
                                <li>
                                    <label>Alfabeto Γ</label>
                                    <input
                                        placeholder="a,b,c...d,e..."
                                        value={alfabeto}
                                        onChange={e => setAlfabeto(e.target.value)}
                                    />
                                </li>
                                <li>
                                    <label>Estado inicial</label>
                                    <input
                                        placeholder="Estado inicial"
                                        value={estadoInicial}
                                        onChange={e => setEstadoInicial(e.target.value)}
                                    />
                                </li>
                                <li>
                                    <label>Vazio</label>
                                    <input
                                        placeholder="Vazio"
                                        value={vazio}
                                        onChange={e => setVazio(e.target.value)}
                                    />
                                </li>
                                <li>
                                    <label>Estado final</label>
                                    <input
                                        placeholder="Estado final"
                                        value={estadoFinal}
                                        onChange={e => setEstadoFinal(e.target.value)}
                                    />
                                </li>
                            </ul>
                            <button type="submit">Configurar máquina</button>
                        </form>
                    </div>
                </li>
                <li>
                    {error ? (
                        <div className="transicoes-container">
                        <h1>δ</h1>
                        <ul>
                            <li>
                                <label>(</label>
                                <Dropdown clearable options={optionsEstados}
                                selection className={'dropdown'}
                                disabled={true}
                                compact={true} />
                                <label>X</label>
                                <Dropdown clearable options={optionsLetras}
                                selection className={'dropdown'}
                                disabled={true}
                                compact={true} />
                                <label>)</label>
                                <label>→</label>
                                <label>(</label>
                                <Dropdown clearable options={optionsEstados}
                                selection className={'dropdown'}
                                disabled={true}
                                compact={true} />
                                <Dropdown clearable options={optionsEstados}
                                selection className={'dropdown'}
                                disabled={true}
                                compact={true} />
                                <Dropdown clearable options={optionsEstados}
                                selection className={'dropdown'}
                                disabled={true}
                                compact={true} />
                                <label>)</label>
                                <Button primary
                                    circular={true} active={false}
                                    className={'button'}>Nova transição</Button>
                            </li>
                        </ul>
                    </div>
                    ) : (
                        <div className="transicoes-container">
                        <h1>δ</h1>
                        <ul>
                            <li>
                                <label>(</label>
                                <Dropdown clearable text={'↓'}
                                options={optionsEstados}
                                selection className={'dropdown'}
                                compact={true} />
                                <label>X</label>
                                <Dropdown clearable text={'↓'}
                                options={optionsLetras}
                                selection className={'dropdown'}
                                compact={true} />
                                <label>)</label>
                                <label>→</label>
                                <label>(</label>
                                <Dropdown clearable text={'↓'}
                                options={optionsEstados}
                                selection className={'dropdown'}
                                compact={true} />
                                <Dropdown clearable text={'↓'}
                                options={optionsLetras}
                                selection className={'dropdown'}
                                compact={true} />
                                <Dropdown clearable text={'L'}
                                options={optionsTuringMachine}
                                selection className={'dropdown'}
                                compact={true} />
                                <label>)</label>
                                <Button primary
                                    circular={true}
                                    className={'button'}>Nova transição</Button>
                                {console.log(optionsEstados)}
                            </li>
                        </ul>
                    </div>
                    )}
                </li>
            </ul>
        </div>
    );
}