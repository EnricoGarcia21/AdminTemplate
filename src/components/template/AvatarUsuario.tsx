import Link from 'next/link'
import useAuth from '../../data/hook/useAuth'

interface AvatarUsuarioProps {
    className?: string
}

export default function AvatarUsuario(props: AvatarUsuarioProps) {
    const { usuario } = useAuth()

    // Garantir fallback confiável caso a imagem venha como undefined, null ou string 'null'
    const src = usuario && usuario.imagemUrl && usuario.imagemUrl !== 'null'
        ? usuario.imagemUrl
        : '/images/avatar.svg'

    return (
        <Link href="/perfil">
            <a>
                <img
                    src={src}
                    alt="Avatar do Usuário"
                    className={`h-10 w-10 rounded-full cursor-pointer object-cover bg-white border border-gray-200 ${props.className ?? ''}`}
                />
            </a>
        </Link>
    )
}