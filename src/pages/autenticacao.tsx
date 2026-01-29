import { useState } from "react"
import AuthInput from "../components/auth/AuthInput"
import { IconeAtencao, IconeGoogle } from "../components/icons"
import useAuth from "../data/hook/useAuth"

export default function Autenticacao() {

    const { cadastrar, login, loginGoogle } = useAuth()

    const [erro, setErro] = useState(null)
    const [modo, setModo] = useState<'login' | 'cadastro'>('login')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    function exibirErro(msg, tempoEmSegundos = 5) {
        setErro(msg)
        setTimeout(() => setErro(null), tempoEmSegundos * 1000)
    }

    async function submeter() {
        try {
            if (modo === 'login') {
                await login(email, senha)
            } else {
                await cadastrar(email, senha)
            }
        } catch(e) {
            exibirErro(e?.message ?? 'Erro desconhecido!')
        }
    }

    return (
        <div className="flex h-screen items-center justify-center bg-blue-50">
            <div className="m-6 w-full max-w-md bg-white/80 backdrop-blur-md rounded-lg p-8 shadow-md text-center">
                <h1 className={`text-3xl font-bold mb-5`}>
                    {modo === 'login' ? 'Entre com a Sua Conta' : 'Cadastre-se na Plataforma'}
                </h1>

                {erro ? (
                    <div className={`
                        flex items-center justify-center
                        bg-red-400 text-white py-3 px-5 my-2
                        border border-red-700 rounded-lg
                    `}>
                        {IconeAtencao()}
                        <span className="ml-3">{erro}</span>
                    </div>
                ) : false}

                <div className="flex flex-col items-center">
                    <AuthInput
                        label="Email"
                        tipo="email"
                        valor={email}
                        valorMudou={setEmail}
                        obrigatorio
                    />
                    <AuthInput
                        label="Senha"
                        tipo="password"
                        valor={senha}
                        valorMudou={setSenha}
                        obrigatorio
                    />

                    <button onClick={submeter} className={`
                        w-full bg-indigo-500 hover:bg-indigo-400
                        text-white rounded-lg px-4 py-3 mt-6
                    `}>
                        {modo === 'login' ? 'Entrar' : 'Cadastrar'}
                    </button>

                    <hr className="my-6 border-gray-300 w-full" />

                    <button onClick={loginGoogle} className={`
                        flex items-center justify-center
                        w-full bg-red-500 hover:bg-red-400
                        text-white rounded-lg px-4 py-3
                    `}>
                        <div className="mr-2">
                            {IconeGoogle}
                        </div>
                        <span>Entrar com Google</span>
                    </button>
                </div>

                <div className="mt-6">
                    {modo === 'login' ? (
                        <p>
                            Novo por aqui?
                            <a onClick={() => setModo('cadastro')} className={`
                                text-blue-500 hover:text-blue-700 font-semibold
                                cursor-pointer ml-2
                            `}>Crie uma conta</a>
                        </p>
                    ) : (
                        <p>
                            Já faz parte da nossa comunidade?
                            <a onClick={() => setModo('login')} className={`
                                text-blue-500 hover:text-blue-700 font-semibold
                                cursor-pointer ml-2
                            `}>Entre</a>
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}