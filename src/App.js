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

    // estado inicial da transição
    const [estadoIncialTransicao, setEstadoIncialTransicao] = useState('');

    // letra inicial da transição
    const [letraIncialTransicao, setLetraIncialTransicao] = useState('');

    // estado final da transição
    const [estadoFinalTransicao, setestadoFinalTransicao] = useState('');

    // letra a ser substituida
    const [letraSubstituicao, setLetraSubstituicao] = useState('');

    // Right, Left ou Stop
    const [direcao, setDirecao] = useState('');
    
    // bool error
    const [error, setError] = useState(true);

    // lista de transições
    const [transicoes, setTransicao] = useState([])

    async function handleTransicao(e) {
        e.preventDefault();

        const eit = await estadoIncialTransicao;
        const lit = await letraIncialTransicao;
        const eft = await estadoFinalTransicao;
        const ls = await letraSubstituicao;
        const dir = await direcao;

        const obj = await {
            'id': transicoes.length,
            'estadoInicial': eit,
            'letraInicial': lit,
            'estadoFinal': eft,
            'letraSubstituir': ls,
            'direcao': dir
        };

        await setTransicao([...transicoes, await obj]);
    }

    async function handleOnChangeEstadoInicial(e, data) {
        e.preventDefault();
        const value = await data.value;
        const object = await optionsEstados[value-1];
        const text = await object.text;
        await setEstadoIncialTransicao(text);
    }

    async function handleOnChangeLetraInicial(e, data) {
        e.preventDefault();
        const value = await data.value;
        const object = await optionsLetras[value-1];
        const text = await object.text;
        await setLetraIncialTransicao(text);
    }

    async function handleOnChangeEstadoFinal(e, data) {
        e.preventDefault();
        const value = await data.value;
        const object = await optionsEstados[value-1];
        const text = await object.text;
        await setestadoFinalTransicao(text);
    }

    async function handleOnChangeSubstituir(e, data) {
        e.preventDefault();
        const value = await data.value;
        const object = await optionsLetras[value-1];
        const text = await object.text;
        await setLetraSubstituicao(text);
    }

    async function handleDirecao(e, data) {
        e.preventDefault();
        const value = await data.value;
        const object = await optionsTuringMachine[value-1];
        const text = await object.text;
        await setDirecao(text);
    }

    function checkTrue(bool) {
        return bool === true;
    }

    async function handleMaquina(e) {
        e.preventDefault();
        
        const arrTransicoes = transicoes;
        console.log(arrTransicoes);
        const arrayPalavra = palavraInicial.split('');
        var transicoesEstadoInicial = [];

        // transicoesEstadoInicial recebe todas os objetos com estado incial
        arrTransicoes.forEach(element => {
            if (element.estadoInicial === estadoInicial) {
                transicoesEstadoInicial.push(element);
            }
        });

        arrayPalavra.forEach(letra => {
            const check = transicoesEstadoInicial.map(element => {
                if (letra === element.letraInicial) {
                    console.log('achou');
                    return true;
                }
                return false;
            });

            const index = check.findIndex(checkTrue); // mesmo indice da transição
            console.log(index);
            console.log(transicoesEstadoInicial[index]);
        
            //console.log(letra, check);
        });

        /*
        arrTransicoes.forEach(element => {
            const data = element;
            var check = check(data.estadoInicial, );
        });
        */

        /*
        transicoesEstadoInicial.forEach(element => {
            arrayPalavra.forEach(letra => {
                if (element.palavraInicial === letra) {
                    console.log(element);
                }
            });
        });
        */

        console.log(transicoesEstadoInicial);
    }

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

            array2.push({
                'key': count2,
                'text': vazio,
                'value': count2
            })
            
            count2++;

            arrayAlfabeto.forEach(element => {
                var obj = {
                    'key': count2,
                    'text': element,
                    'value': count2
                };
                array2.push(obj);
                count2++;
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
                            </li>
                        </ul>
                    </div>
                    ) : (
                        <div className="transicoes-container">
                        <ul>
                            <li className={'element'}>
                                <label>(</label>
                                <Dropdown clearable
                                options={optionsEstados}
                                onChange={handleOnChangeEstadoInicial}
                                selection className={'dropdown'}
                                compact={true} />
                                <label>X</label>
                                <Dropdown clearable
                                options={optionsLetras}
                                onChange={handleOnChangeLetraInicial}
                                selection className={'dropdown'}
                                compact={true} />
                                <label>)</label>
                                <label>→</label>
                                <label>(</label>
                                <Dropdown clearable
                                options={optionsEstados}
                                onChange={handleOnChangeEstadoFinal}
                                selection className={'dropdown'}
                                compact={true} />
                                <Dropdown clearable
                                options={optionsLetras}
                                onChange={handleOnChangeSubstituir}
                                selection className={'dropdown'}
                                compact={true} />
                                <Dropdown clearable
                                onChange={handleDirecao}
                                options={optionsTuringMachine}
                                selection className={'dropdown'}
                                compact={true} />
                                <label>)</label>
                                <Button primary
                                circular={true} onClick={handleTransicao}
                                className={'button'}>Salvar transição</Button>      
                            </li>
                        </ul>
                        <p>δ {'{'}</p>
                        <ul className="transicoes">
                        {transicoes.map((transicao, index) => {
                            return index === (transicoes.length - 1) ?
                                    <li key={index} className={'transicoes'}>
                                        ({transicao.estadoInicial},
                                        {transicao.letraInicial}) →
                                        ({transicao.estadoFinal},
                                        {transicao.letraSubstituir},
                                        {transicao.direcao})
                                    </li>
                            : (
                                <li key={index} className={'transicoes'}>
                                    ({transicao.estadoInicial},
                                    {transicao.letraInicial}) →
                                    ({transicao.estadoFinal},
                                    {transicao.letraSubstituir},
                                    {transicao.direcao}),
                                </li>
                            )
                        })}
                    
                        </ul>
                        <p>{'}'}</p>

                        <Button primary onClick={handleMaquina}
                            className={'btn'}>Executar máquina de Turing
                        </Button>
                    </div>
                    )}
                </li>
            </ul>
        </div>
    );
}